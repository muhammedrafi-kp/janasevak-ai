import { useState } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, Check, CheckCircle2, LoaderCircle, MapPin, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ISSUE_CATEGORY_OPTIONS, MAX_DESCRIPTION_LENGTH } from '../features/report-issue/constants';
import { AttachmentUploader } from '../features/report-issue/components/AttachmentUploader';
import { LocationPicker } from '../features/report-issue/components/LocationPicker';
import { ReportProgress } from '../features/report-issue/components/ReportProgress';
import { useReportAttachments } from '../features/report-issue/hooks/useReportAttachments';
import { answerReportFollowUp, submitReportDraft, type AiResult } from '../features/report-issue/services/reportIssue.service';
import type { IssueCategory, LocationSelection, ReportDraft } from '../features/report-issue/types';

type ReportStep = 1 | 2 | 3 | 4;

export const ReportIssue = () => {
  const [step, setStep] = useState<ReportStep>(1);
  const [category, setCategory] = useState<IssueCategory | null>(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<LocationSelection | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const { attachments, addFiles, removeAttachment, resetAttachments, isScanning } = useReportAttachments();

  const addAttachments = (files: File[]) => {
    const result = addFiles(files);
    setAttachmentError(result.error);
  };

  const selectLocation = (selection: LocationSelection) => {
    setLocation(selection);
    setLocationError(null);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Your browser does not support location services. Please select a point on the map.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        selectLocation({ lat, lng, label: `Current location: ${lat.toFixed(5)}, ${lng.toFixed(5)}` });
        setIsLocating(false);
      },
      () => {
        setLocationError('We could not get your location. Check permission or choose a point on the map.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const canContinueFromDetails = Boolean(category && description.trim() && attachments.length > 0 && !isScanning);

  const goToNextStep = () => {
    if (step === 1) {
      if (!canContinueFromDetails) {
        setAttachmentError(isScanning
          ? 'Please wait for image analysis to finish.'
          : 'Select a category, add at least one image, and describe the issue.');
        return;
      }
      setAttachmentError(null);
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!location) {
        setLocationError('Choose the issue location on the map or use your current location.');
        return;
      }
      setStep(3);
    }
  };

  const submit = async () => {
    if (!category || !location || !description.trim()) return;

    const draft: ReportDraft = {
      category,
      description: description.trim(),
      attachments,
      location,
      aiAnalysis: { suggestedCategory: category, source: 'frontend-demo' },
    };

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitReportDraft(draft);
      if (result.mode === 'followup') setAiResult(result); else setStep(4);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'The report could not be prepared. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const answerFollowUp = async () => {
    if (!category || !location || !aiResult) return;
    const answers = aiResult.analysis.followUpQuestions.map((question) => ({ questionId: question.id, answer: followUpAnswers[question.id]?.trim() || '' })).filter((answer) => answer.answer);
    if (!answers.length) { setSubmitError('Answer at least one AI follow-up question.'); return; }
    setIsSubmitting(true); setSubmitError(null);
    try { const result = await answerReportFollowUp(aiResult.sessionId, answers); if (result.mode === 'followup') setAiResult(result); else setStep(4); } catch (error) { setSubmitError(error instanceof Error ? error.message : 'Could not update AI analysis.'); } finally { setIsSubmitting(false); }
  };

  const reset = () => {
    resetAttachments();
    setCategory(null);
    setDescription('');
    setLocation(null);
    setAttachmentError(null);
    setLocationError(null);
    setSubmitError(null);
    setAiResult(null);
    setFollowUpAnswers({});
    setStep(1);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <Card className="overflow-hidden border-slate-200 shadow-xl shadow-slate-200/40">
        <CardContent className="p-0">
          <div className="border-b border-slate-100 px-6 py-8 sm:px-10">
            <h1 className="text-3xl font-bold text-slate-900">Report a New Issue</h1>
            <p className="mt-2 text-slate-500">Let&apos;s work together to make our community better.</p>
          </div>

          {step < 4 && <div className="px-6 pt-8 sm:px-10"><ReportProgress currentStep={step} /></div>}

          {step === 1 && (
            <div className="space-y-8 px-6 py-8 sm:px-10">
              <section>
                <h2 className="text-lg font-bold text-slate-900">1. What&apos;s the issue?</h2>
                <p className="mt-1 text-sm text-slate-500">Select the category that best describes the problem.</p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {ISSUE_CATEGORY_OPTIONS.map(({ name, icon: Icon }) => <button key={name} type="button" onClick={() => setCategory(name)} className={`flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border-2 p-4 text-sm font-semibold transition ${category === name ? 'border-primary bg-primary-50 text-primary shadow-sm' : 'border-slate-200 text-slate-700 hover:border-primary/40 hover:bg-slate-50'}`}><Icon size={31} strokeWidth={1.8} />{name}</button>)}
                </div>
              </section>

              <AttachmentUploader attachments={attachments} error={attachmentError} onAddFiles={addAttachments} onRemove={removeAttachment} />

              <section>
                <div className="flex items-baseline justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">3. Describe the issue</h2><p className="mt-1 text-sm text-slate-500">Provide useful details about the problem.</p></div><span className="text-sm text-slate-500">{description.length}/{MAX_DESCRIPTION_LENGTH}</span></div>
                <textarea value={description} maxLength={MAX_DESCRIPTION_LENGTH} onChange={(event) => setDescription(event.target.value)} rows={5} aria-label="Issue description" placeholder="Example: Large pothole causing vehicle damage on this road..." className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </section>
            </div>
          )}

          {step === 2 && <LocationPicker location={location} error={locationError} isLocating={isLocating} onLocationSelect={selectLocation} onUseCurrentLocation={useCurrentLocation} />}

          {step === 3 && (
            <div className="space-y-7 px-6 py-8 sm:px-10">
              <div><h2 className="text-xl font-bold text-slate-900">Review your report</h2><p className="mt-1 text-sm text-slate-500">AI analysis runs before final submission.</p></div>
              {aiResult?.mode === 'followup' && <div className="space-y-4 rounded-xl border border-primary/20 bg-primary-50 p-5"><p className="font-semibold text-primary">{aiResult.analysis.userMessage}</p>{aiResult.analysis.followUpQuestions.map((question) => <label key={question.id} className="block text-sm font-medium text-slate-700">{question.question}{question.answerType === 'SINGLE_SELECT' ? <select className="mt-2 w-full rounded-lg border p-2" value={followUpAnswers[question.id] || ''} onChange={(event) => setFollowUpAnswers({ ...followUpAnswers, [question.id]: event.target.value })}><option value="">Select an answer</option>{question.options.map((option) => <option key={option}>{option}</option>)}</select> : <input className="mt-2 w-full rounded-lg border p-2" type={question.answerType === 'NUMBER' ? 'number' : 'text'} value={followUpAnswers[question.id] || ''} onChange={(event) => setFollowUpAnswers({ ...followUpAnswers, [question.id]: event.target.value })} />}</label>)}</div>}
              <div className="grid gap-6 lg:grid-cols-2"><div className="rounded-xl border border-slate-200 p-5"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Issue</p><p className="mt-2 font-semibold text-slate-900">{category}</p><p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">{description}</p></div><div className="rounded-xl border border-slate-200 p-5"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Location</p><p className="mt-2 flex items-center gap-2 font-semibold text-slate-900"><MapPin size={18} className="text-primary" />{location?.label}</p><p className="mt-2 text-sm text-slate-500">Coordinates: {location?.lat.toFixed(5)}, {location?.lng.toFixed(5)}</p></div></div>
              <div><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Photos ({attachments.length})</p><div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">{attachments.map((attachment) => <img key={attachment.id} src={attachment.previewUrl} alt={attachment.file.name} className="aspect-square rounded-xl border border-slate-200 object-cover" />)}</div></div>
              {submitError && <p role="alert" className="flex items-center gap-2 text-sm text-red-600"><AlertCircle size={16} />{submitError}</p>}
            </div>
          )}

          {step === 4 && <div className="px-6 py-16 text-center sm:px-10"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 size={42} /></div><h2 className="mt-6 text-3xl font-bold text-slate-900">Report submitted successfully</h2><p className="mx-auto mt-3 max-w-xl text-slate-500">Your images were analyzed, uploaded to Cloudinary, and saved as a civic complaint.</p><Button type="button" className="mt-8 gap-2" onClick={reset}><Plus size={18} />Report another issue</Button></div>}

          {step < 4 && <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-5 sm:px-10">{step === 1 ? <Button type="button" variant="outline" onClick={reset}>Cancel</Button> : <Button type="button" variant="outline" onClick={() => setStep((current) => (current - 1) as ReportStep)} className="gap-2"><ArrowLeft size={17} />Back</Button>}{step < 3 ? <Button type="button" onClick={goToNextStep} className="gap-2">Next<ArrowRight size={17} /></Button> : <Button type="button" onClick={aiResult?.mode === 'followup' ? answerFollowUp : submit} disabled={isSubmitting} className="gap-2">{isSubmitting ? <LoaderCircle className="animate-spin" size={17} /> : <Check size={17} />}{isSubmitting ? 'Preparing report…' : aiResult?.mode === 'followup' ? 'Update AI analysis' : 'Submit report'}</Button>}</div>}
        </CardContent>
      </Card>
    </div>
  );
};

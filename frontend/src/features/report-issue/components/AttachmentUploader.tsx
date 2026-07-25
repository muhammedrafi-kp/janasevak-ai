import { useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { AlertCircle, Check, ScanLine, UploadCloud, X, Zap } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { MAX_ATTACHMENTS } from '../constants';
import type { ReportAttachment } from '../types';

interface AttachmentUploaderProps {
  attachments: ReportAttachment[];
  error: string | null;
  onAddFiles: (files: File[]) => void;
  onRemove: (id: string) => void;
}

export function AttachmentUploader({ attachments, error, onAddFiles, onRemove }: AttachmentUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const allScansComplete = attachments.length > 0 && attachments.every((attachment) => attachment.scanState === 'complete');

  const selectFiles = (event: ChangeEvent<HTMLInputElement>) => {
    onAddFiles(Array.from(event.target.files ?? []));
    event.target.value = '';
  };

  const dropFiles = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    onAddFiles(Array.from(event.dataTransfer.files));
  };

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">2. Add photos</h2>
          <p className="mt-1 text-sm text-slate-500">Upload up to 4 clear photos of the issue. Each photo is limited to 5 MB.</p>
        </div>
        <span className="text-sm font-medium text-slate-500">{attachments.length}/{MAX_ATTACHMENTS}</span>
      </div>

      {attachments.length < MAX_ATTACHMENTS && (
        <div onDrop={dropFiles} onDragOver={(event) => event.preventDefault()} onDragEnter={() => setIsDragging(true)} onDragLeave={() => setIsDragging(false)} onClick={() => inputRef.current?.click()} className={`mt-5 cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${isDragging ? 'border-primary bg-primary-50' : 'border-slate-200 hover:border-primary/50 hover:bg-slate-50'}`}>
          <UploadCloud className="mx-auto text-primary" size={34} />
          <p className="mt-3 font-medium text-slate-800">Drag and drop images here</p>
          <p className="mt-1 text-sm text-slate-500">or click to choose files</p>
          <Button type="button" variant="outline" className="pointer-events-none mt-4">Choose files</Button>
          <input ref={inputRef} className="hidden" type="file" accept="image/jpeg,image/png" multiple onChange={selectFiles} />
        </div>
      )}

      {error && <p role="alert" className="mt-3 flex items-center gap-2 text-sm text-red-600"><AlertCircle size={16} />{error}</p>}

      {attachments.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {attachments.map((attachment) => (
            <div className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100" key={attachment.id}>
              <img src={attachment.previewUrl} alt={attachment.file.name} className={`h-full w-full object-cover ${attachment.scanState === 'scanning' ? 'opacity-60 grayscale' : ''}`} />
              {attachment.scanState === 'scanning' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/25 text-center text-white">
                  <ScanLine className="animate-pulse" size={28} />
                  <span className="mt-2 text-xs font-semibold">AI scanning…</span>
                  <span className="absolute left-0 top-0 h-1 w-full animate-[pulse_1s_ease-in-out_infinite] bg-primary shadow-[0_0_12px_#1D4ED8]" />
                </div>
              ) : <div className="absolute bottom-2 left-2 rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white"><Check size={12} className="mr-1 inline" />Analyzed</div>}
              <button type="button" aria-label={`Remove ${attachment.file.name}`} onClick={() => onRemove(attachment.id)} className="absolute right-2 top-2 rounded-full bg-white/95 p-1.5 text-slate-700 shadow transition hover:bg-red-50 hover:text-red-600"><X size={16} /></button>
            </div>
          ))}
        </div>
      )}

      {allScansComplete && <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-50 p-4 text-sm text-slate-700"><Zap className="mt-0.5 shrink-0 text-primary" size={18} /><p><strong className="text-primary">AI analysis preview:</strong> Your image scans are complete. A real AI analysis can replace this frontend-only preview when the service is available.</p></div>}
    </section>
  );
}

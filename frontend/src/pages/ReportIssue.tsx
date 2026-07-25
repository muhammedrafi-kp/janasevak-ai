import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { MapPin, Camera, Upload, CheckCircle2, ChevronRight, ChevronLeft, Bot, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ReportIssue = () => {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Report an Issue</h1>
        <p className="text-slate-500 mt-2">Help us keep the city clean and safe.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
        
        {[
          { num: 1, label: 'Location' },
          { num: 2, label: 'Photo & AI' },
          { num: 3, label: 'Details' },
          { num: 4, label: 'Submit' },
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-background-darkAlt p-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              step >= s.num ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
            }`}>
              {step > s.num ? <CheckCircle2 size={16} /> : s.num}
            </div>
            <span className={`text-xs font-medium ${step >= s.num ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Location */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><MapPin className="text-primary" /> Pinpoint Location</h3>
                <p className="text-slate-500 mb-6">Where did you spot the issue?</p>
                
                <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 relative flex items-center justify-center overflow-hidden mb-6">
                  {/* Mock Map */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="text-center">
                    <MapPin size={48} className="text-primary mx-auto mb-2 animate-bounce" />
                    <p className="font-medium text-slate-700 dark:text-slate-300">MG Road, near Metro Station</p>
                    <p className="text-xs text-slate-500">Drag to adjust pin</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 gap-2">
                    <MapPin size={16} /> Use Current Location
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Photo & AI */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Camera className="text-primary" /> Upload Photo</h3>
                <p className="text-slate-500 mb-6">Our AI will automatically analyze the image to categorize the issue.</p>
                
                {!isScanning && !scanComplete ? (
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-12 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={simulateScan}>
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload size={24} />
                    </div>
                    <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Click to Upload or Drag & Drop</h4>
                    <p className="text-slate-500 text-sm">Supports JPG, PNG (Max 5MB)</p>
                  </div>
                ) : (
                  <div className="relative rounded-3xl overflow-hidden bg-slate-900">
                    <img 
                      src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800" 
                      alt="Pothole" 
                      className={`w-full h-[300px] object-cover transition-all duration-1000 ${isScanning ? 'opacity-50 grayscale' : 'opacity-100'}`}
                    />
                    
                    {/* Scanning Animation */}
                    {isScanning && (
                      <motion.div 
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-1 bg-primary shadow-[0_0_15px_#1D4ED8] z-10"
                      />
                    )}

                    {isScanning && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
                        <Bot size={48} className="text-primary mb-4 animate-pulse" />
                        <h4 className="text-xl font-bold">Janasevak AI is analyzing...</h4>
                        <p className="text-white/70">Identifying issue type and severity</p>
                      </div>
                    )}

                    {scanComplete && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                            <AlertTriangle size={24} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 dark:text-white">Severe Pothole Detected</h4>
                              <span className="text-[10px] uppercase font-bold tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">AI Match 98%</span>
                            </div>
                            <p className="text-sm text-slate-500">Category: Roads • Priority: High</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => {setScanComplete(false); setIsScanning(false);}}>Retake</Button>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 space-y-6"
              >
                <h3 className="text-xl font-bold mb-4">Confirm Details</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Issue Title (AI Generated)</label>
                  <Input defaultValue="Severe Pothole on Main Road" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                    <select className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-background-darkAlt">
                      <option>Roads & Infrastructure</option>
                      <option>Sanitation</option>
                      <option>Water Supply</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Priority</label>
                    <select className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-background-darkAlt text-orange-600 font-semibold">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Additional Comments</label>
                  <textarea 
                    rows={4} 
                    className="flex w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-background-darkAlt"
                    placeholder="Provide any extra details here..."
                  ></textarea>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Issue Reported Successfully!</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                  Thank you for being an active citizen. Your report has been verified by Janasevak AI and routed to the <strong>Roads & Highways Department</strong>.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
                  <Button variant="outline" onClick={() => setStep(1)}>Report Another Issue</Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </CardContent>
        
        {/* Navigation Footer */}
        {step < 4 && (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={handleBack} 
              disabled={step === 1}
              className="gap-2"
            >
              <ChevronLeft size={16} /> Back
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={step === 2 && !scanComplete}
              className="gap-2"
            >
              {step === 3 ? 'Submit Report' : 'Continue'} <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

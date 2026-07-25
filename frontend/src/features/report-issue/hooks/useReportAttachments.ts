import { useEffect, useRef, useState } from 'react';
import { MAX_ATTACHMENTS, MAX_ATTACHMENT_SIZE_BYTES } from '../constants';
import type { ReportAttachment } from '../types';

interface AttachmentUploadResult {
  attachments: ReportAttachment[];
  error: string | null;
}

export function useReportAttachments() {
  const [attachments, setAttachments] = useState<ReportAttachment[]>([]);
  const attachmentsRef = useRef<ReportAttachment[]>([]);
  const pendingScanIds = useRef<string[]>([]);
  const [scanRun, setScanRun] = useState(0);

  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  useEffect(() => () => attachmentsRef.current.forEach((attachment) => URL.revokeObjectURL(attachment.previewUrl)), []);

  useEffect(() => {
    if (scanRun === 0) return;

    const timers = pendingScanIds.current.map((id, index) => window.setTimeout(() => {
      setAttachments((current) => current.map((attachment) => (
        attachment.id === id ? { ...attachment, scanState: 'complete' } : attachment
      )));
    }, 900 + index * 700));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [scanRun]);

  const addFiles = (files: File[]): AttachmentUploadResult => {
    const availableSlots = MAX_ATTACHMENTS - attachmentsRef.current.length;
    if (availableSlots === 0) {
      return { attachments: attachmentsRef.current, error: `You can upload a maximum of ${MAX_ATTACHMENTS} images.` };
    }

    const acceptableFiles = files.filter((file) => ['image/jpeg', 'image/png'].includes(file.type) && file.size <= MAX_ATTACHMENT_SIZE_BYTES);
    const acceptedFiles = acceptableFiles.slice(0, availableSlots);
    const newAttachments = acceptedFiles.map((file): ReportAttachment => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      scanState: 'scanning',
    }));

    if (newAttachments.length) {
      pendingScanIds.current = newAttachments.map((attachment) => attachment.id);
      setAttachments((current) => [...current, ...newAttachments]);
      setScanRun((current) => current + 1);
    }

    const invalidFileIncluded = acceptableFiles.length !== files.length;
    const overLimit = acceptableFiles.length > availableSlots;
    const error = invalidFileIncluded
      ? 'Only JPG or PNG images up to 5 MB are accepted.'
      : overLimit
        ? `Only ${availableSlots} more image${availableSlots === 1 ? '' : 's'} can be added.`
        : null;

    return { attachments: [...attachmentsRef.current, ...newAttachments], error };
  };

  const removeAttachment = (id: string) => {
    setAttachments((current) => {
      const attachment = current.find((item) => item.id === id);
      if (attachment) URL.revokeObjectURL(attachment.previewUrl);
      return current.filter((item) => item.id !== id);
    });
  };

  const resetAttachments = () => {
    attachmentsRef.current.forEach((attachment) => URL.revokeObjectURL(attachment.previewUrl));
    setAttachments([]);
    pendingScanIds.current = [];
  };

  return {
    attachments,
    addFiles,
    removeAttachment,
    resetAttachments,
    isScanning: attachments.some((attachment) => attachment.scanState === 'scanning'),
  };
}

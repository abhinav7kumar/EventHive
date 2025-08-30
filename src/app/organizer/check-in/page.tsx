'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Camera, QrCode, Ticket, UserCheck, UserX, Frown } from 'lucide-react';
import Link from 'next/link';
import jsQR from 'jsqr';

type ScanStatus = 'waiting' | 'success' | 'failure' | 'duplicate';

const MOCK_TICKET_DB: Record<string, { name: string; status: 'valid' | 'checked-in' }> = {
  '12345-ABCDE': { name: 'John Doe', status: 'valid' },
  '67890-FGHIJ': { name: 'Jane Smith', status: 'checked-in' },
  '11223-KLMNO': { name: 'Peter Jones', status: 'valid' },
};


export default function CheckInScannerPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanStatus, setScanStatus] = useState<ScanStatus>('waiting');
  const [scannedData, setScannedData] = useState<{name: string, status: string} | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not supported');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Unsupported Browser',
          description: 'Your browser does not support camera access for scanning.',
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };

    getCameraPermission();

    return () => {
      // Cleanup: stop the camera stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
        if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current && isScanning) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context) {
                canvas.height = video.videoHeight;
                canvas.width = video.videoWidth;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: 'dontInvert',
                });

                if (code) {
                    setIsScanning(false);
                    handleScanResult(code.data);
                }
            }
        }
        animationFrameId = requestAnimationFrame(tick);
    };

    if (hasCameraPermission) {
        animationFrameId = requestAnimationFrame(tick);
    }

    return () => {
        cancelAnimationFrame(animationFrameId);
    };
  }, [hasCameraPermission, isScanning]);


  const handleScanResult = (data: string) => {
    try {
        const parsedData = JSON.parse(data);
        const ticketId = parsedData.ticketId;
        
        if (MOCK_TICKET_DB[ticketId]) {
            const ticket = MOCK_TICKET_DB[ticketId];
            if (ticket.status === 'valid') {
                MOCK_TICKET_DB[ticketId].status = 'checked-in';
                setScanStatus('success');
                setScannedData({ name: ticket.name, status: 'Checked-In' });
            } else {
                setScanStatus('duplicate');
                setScannedData({ name: ticket.name, status: 'Already Checked-In' });
            }
        } else {
            setScanStatus('failure');
            setScannedData({ name: 'Unknown Ticket', status: 'Invalid' });
        }
    } catch(e) {
        // Fallback for simple string QR codes
        if(MOCK_TICKET_DB[data]) {
            const ticket = MOCK_TICKET_DB[data];
            if (ticket.status === 'valid') {
                MOCK_TICKET_DB[data].status = 'checked-in';
                setScanStatus('success');
                setScannedData({ name: ticket.name, status: 'Checked-In' });
            } else {
                setScanStatus('duplicate');
                setScannedData({ name: ticket.name, status: 'Already Checked-In' });
            }
        } else {
            setScanStatus('failure');
            setScannedData({name: 'Invalid QR Code', status: 'Not recognized'});
        }
    }

    setTimeout(() => {
        setScanStatus('waiting');
        setScannedData(null);
        setIsScanning(true);
    }, 4000);
  };

  const StatusDisplay = () => {
    switch (scanStatus) {
      case 'success':
        return (
          <div className="text-center text-green-500 animate-fade-in">
            <UserCheck className="mx-auto h-16 w-16 mb-2" />
            <h3 className="text-xl font-bold">Success!</h3>
            <p>{scannedData?.name} checked-in.</p>
          </div>
        );
      case 'failure':
        return (
          <div className="text-center text-destructive animate-fade-in">
            <UserX className="mx-auto h-16 w-16 mb-2" />
            <h3 className="text-xl font-bold">Invalid Ticket</h3>
            <p>This ticket is not valid for this event.</p>
          </div>
        );
      case 'duplicate':
          return (
          <div className="text-center text-yellow-500 animate-fade-in">
            <UserX className="mx-auto h-16 w-16 mb-2" />
            <h3 className="text-xl font-bold">Already Checked In</h3>
            <p>{scannedData?.name} has already been scanned.</p>
          </div>
        );
      default:
        return (
          <div className="text-center text-muted-foreground">
            <QrCode className="mx-auto h-16 w-16 mb-2" />
            <h3 className="text-xl font-bold">Ready to Scan</h3>
            <p>Position the ticket's QR code in front of the camera.</p>
          </div>
        );
    }
  };


  return (
    <div className="bg-muted/40 min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera />
            Event Check-in Scanner
          </CardTitle>
          <CardDescription>
            Point the camera at an attendee's QR code to validate their ticket.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video w-full bg-slate-900 rounded-lg overflow-hidden relative border">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                 <div className="w-64 h-64 border-4 border-dashed border-white/50 rounded-lg"/>
            </div>
            {hasCameraPermission === false && (
               <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white p-4">
                    <Frown className="h-12 w-12 mb-4 text-destructive"/>
                    <h2 className="text-xl font-bold">Camera Not Available</h2>
                    <p className="text-center">Please grant camera permission to use the scanner.</p>
               </div>
            )}
          </div>
          
          <div className="p-6 border rounded-lg h-36 flex items-center justify-center">
            <StatusDisplay />
          </div>
          
          <div className="text-center pt-4">
            <Link href="/organizer">
                <Button variant="link">Back to Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

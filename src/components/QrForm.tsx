import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function QrForm({
  generateQR,
}: {
  generateQR: (text: string) => void;
}) {
  const [inputText, setInputText] = useState<string>('');

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Generate QR code</CardTitle>
        <CardDescription>
          Enter the text you want to generate a QR code with.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-2">
            <Label htmlFor="qr-code">QR code content</Label>
            <Input
              id="qr-code"
              type="text"
              required
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant={inputText?.length > 0 ? 'default' : 'outline'}
          disabled={inputText?.length > 0 ? false : true}
          className="w-full cursor-pointer"
          onClick={() => generateQR(inputText)}
        >
          Generate QR code
        </Button>
      </CardFooter>
    </Card>
  );
}

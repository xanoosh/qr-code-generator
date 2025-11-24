import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Combobox from './Form/FormElements/Combobox';
import Form from './Form/Form';

const MaskPatterns = [
  {
    value: '0',
    label: 'Zero',
  },
  {
    value: '1',
    label: 'One',
  },
  {
    value: '2',
    label: 'Two',
  },
  {
    value: '3',
    label: 'Three',
  },
  {
    value: '4',
    label: 'Four',
  },
  {
    value: '5',
    label: 'Five',
  },
  {
    value: '6',
    label: 'Six',
  },
  {
    value: '7',
    label: 'Seven',
  },
];

export default function QrForm({
  generateQR,
}: {
  generateQR: (text: string) => void;
}) {
  const [inputText, setInputText] = useState<string>('');
  const [maskPatternText, setMaskPatternText] = useState<string>('');

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
            <Input
              id="qr-code"
              type="text"
              required
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Combobox
              value={maskPatternText}
              setValue={setMaskPatternText}
              list={MaskPatterns}
            />
          </div>
        </form>
        <Form />
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

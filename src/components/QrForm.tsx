import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Form from './Form/Form';

export default function QrForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Generate QR code</CardTitle>
        <CardDescription>
          Enter the text you want to generate a QR code with.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  );
}

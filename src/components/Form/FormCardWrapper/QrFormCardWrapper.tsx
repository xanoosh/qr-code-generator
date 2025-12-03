import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FieldGroup, FieldSet } from '@/components/ui/field';

import type { QrFormCardWrapperProps } from '@/types';

export default function QrFormCardWrapper({
  title,
  description,
  children,
}: QrFormCardWrapperProps) {
  return (
    <Card className="w-sm">
      <CardHeader>
        {title ? <CardTitle>{title}</CardTitle> : null}
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldGroup>{children}</FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}

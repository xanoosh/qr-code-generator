import QrForm from '@/components/QrForm';
import QrDialog from '@/components/QrDialog';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import ThemeToggler from '@/components/Theme/ThemeToggler';

function App() {
  return (
    <ThemeProvider>
      <title>QR Code Generator</title>
      <main className="h-screen flex flex-col gap-4 justify-center items-center bg-slate-100 dark:bg-stone-900 p-4">
        <ThemeToggler />
        <QrForm />
        <QrDialog />
      </main>
    </ThemeProvider>
  );
}

export default App;

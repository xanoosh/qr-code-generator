import QrDialog from '@/components/Dialog/QrDialog';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import ThemeToggler from '@/components/Theme/ThemeToggler';
import QrForm from './components/Form/QrForm';

function App() {
  return (
    <ThemeProvider>
      <title>QR Code Generator</title>
      <main className="min-h-screen flex flex-col sm:px-8 py-8 px-4 gap-8 items-center bg-slate-100 dark:bg-stone-900">
        <ThemeToggler />
        <QrForm />
        <QrDialog />
      </main>
    </ThemeProvider>
  );
}

export default App;

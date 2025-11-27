import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useThemeStore } from '@/store/themeStore';

export default function ThemeToggler() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex items-center justify-end space-x-2 w-full">
      <Switch
        id="airplane-mode"
        checked={theme === 'dark'}
        onCheckedChange={(e) => setTheme(e === true ? 'dark' : 'light')}
      />
      <Label htmlFor="airplane-mode">
        {theme === 'dark' ? 'Dark mode' : 'Light mode'}
      </Label>
    </div>
  );
}

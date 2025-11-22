import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface SortSelectProps {
  value: 'none' | 'asc' | 'desc';
  onChange: (v: 'none' | 'asc' | 'desc') => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="w-full max-w-xs">
      <Select value={value} onValueChange={(v) => onChange(v as any)}>
        <SelectTrigger>
          <SelectValue placeholder="Sắp xếp theo giá" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="none">Mặc định</SelectItem>
          <SelectItem value="asc">Giá tăng dần</SelectItem>
          <SelectItem value="desc">Giá giảm dần</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

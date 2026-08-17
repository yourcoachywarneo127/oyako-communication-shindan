interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const percentage = Math.round((current / total) * 100);

  return (
    
      
    
  );
}

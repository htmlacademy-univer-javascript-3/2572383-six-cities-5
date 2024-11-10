interface MarkProps {
  className: string;
  mark?: string;
}

export function Mark(props: MarkProps) {
  return (
    <div className={props.className}>
      <span>{props.mark}</span>
    </div>
  );
}

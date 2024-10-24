interface MarkProps {
  className: string;
  mark: string | undefined;
}

export function Mark(props: MarkProps) {
  if (!props.mark) {
    return null;
  }

  return (
    <div className={props.className}>
      <span>{props.mark}</span>
    </div>
  );
}

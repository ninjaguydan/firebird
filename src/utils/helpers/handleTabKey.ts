export default function handleTabKey(e: React.KeyboardEvent<HTMLInputElement>, modalRef: any) {
  const focusableElements = modalRef.current.querySelectorAll(
    "a[href], button:not(:disabled), textarea, input, select",
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.shiftKey && document.activeElement === firstElement) {
    e.preventDefault();
    lastElement.focus();
  } else if (!e.shiftKey && document.activeElement === lastElement) {
    e.preventDefault();
    firstElement.focus();
  }
}

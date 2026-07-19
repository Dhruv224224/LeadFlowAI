import { useEffect, useState } from 'react';

export function useTypewriter(
  words: string[],
  typeSpeed = 80,
  deleteSpeed = 40,
  holdTime = 2000
) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (deleting) {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
      } else {
        setDeleting(false);
        setIndex((i) => i + 1);
      }
    } else {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setDeleting(true), holdTime);
      }
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, holdTime]);

  return text;
}

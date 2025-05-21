import { Suspense } from 'react';
import ResultClient from './ResultClient';

export const dynamic = 'force-dynamic';

export default function ResultPage() {
  return (
    <Suspense fallback={<div>결과 불러오는 중...</div>}>
      <ResultClient />
    </Suspense>
  );
}

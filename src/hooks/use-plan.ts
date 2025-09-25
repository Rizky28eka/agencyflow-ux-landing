import { useState } from 'react';

type Plan = 'starter' | 'basic' | 'professional' | 'business' | 'enterprise';

export const usePlan = () => {
  const [plan, setPlan] = useState<Plan>('professional');

  return { plan, setPlan };
};
'use client';
import { useState } from 'react';

type SwitchProps = {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
};

export default function Switch({ checked, onChange, disabled }: SwitchProps) {
  const [internal, setInternal] = useState(false);
  const isControlled = checked !== undefined;
  const enabled = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !enabled;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        enabled ? 'bg-switch-track-on' : 'bg-switch-track-off'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-switch-thumb shadow transition-transform duration-200 ${
          enabled ? 'translate-x-1' : 'translate-x-6'
        }`}
      />
    </button>
  );
}

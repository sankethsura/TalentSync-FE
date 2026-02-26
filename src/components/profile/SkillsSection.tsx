'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { ProfileFormData } from '@/lib/validators';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

const PROFICIENCY_OPTIONS = [
  { value: 'BEGINNER',     label: 'Beginner'     },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED',     label: 'Advanced'     },
  { value: 'EXPERT',       label: 'Expert'       },
];

export function SkillsSection() {
  const { register, control, formState: { errors } } = useFormContext<ProfileFormData>();
  const { fields, append, remove } = useFieldArray({ control, name: 'skills' });

  return (
    <div className="space-y-3">
      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground/70 py-2">
          No skills added yet. Add your first skill below.
        </p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-1 gap-3 rounded-xl border border-border/15 bg-surface/30 p-4 sm:grid-cols-3">
          <Input
            label="Skill"
            placeholder="e.g. TypeScript"
            error={errors.skills?.[index]?.name?.message}
            {...register(`skills.${index}.name`)}
          />
          <Select
            label="Proficiency"
            options={PROFICIENCY_OPTIONS}
            {...register(`skills.${index}.proficiencyLevel`)}
          />
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                label="Years (optional)"
                type="number"
                min={0}
                max={50}
                placeholder="0"
                {...register(`skills.${index}.yearsOfExperience`)}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="mb-0.5 text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ name: '', proficiencyLevel: 'INTERMEDIATE', yearsOfExperience: undefined })}
      >
        + Add Skill
      </Button>
    </div>
  );
}

export interface Case {
  id: number
  patient_name: string
  patient_age?: number
  location: string
  diagnosis_date: string
  status: 'suspected' | 'confirmed' | 'recovered' | 'deceased'
  created_by: number
  created_at: string
  updated_at: string
}

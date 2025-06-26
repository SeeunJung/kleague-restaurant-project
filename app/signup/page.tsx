'use client'
import AuthButtons from '@/components/Auth/AuthButtons'
import AuthInput from '@/components/Auth/AuthInput'
import AuthTitle from '@/components/Auth/AuthTitle'
import { KLEAGUE_TEAMS, SIGNUP_INPUT } from '@/constants'
import { signup } from '@/services/auth'
import {
  Card,
  flexCol,
  flexColIJCenter,
  mainTitle,
} from '@/styles/customStyle'
import { cn } from '@/utils/cn'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import validationsSchema from '@/schemas/register'

function Page() {
  const router = useRouter()

  const {
    control,
    formState: { isValid, errors },
    getValues,
  } = useForm({
    resolver: zodResolver(validationsSchema),
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      password: '',
      confirmPw: '',
      phoneNumber: '',
      favoriteTeam: '',
    },
    mode: 'onChange',
  })

  const handleSignup = async () => {
    console.log(getValues(), isValid)

    try {
      await signup(getValues())
      router.push('/login')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={cn('mt-9')}>
      <AuthTitle subT="새로운 계정을 만들어보세요" />
      <div className={Card('w-[350px]', 'mx-auto', 'space-y-5')}>
        <span className={flexColIJCenter(mainTitle())}>회원가입</span>
        <div className={flexCol('w-full', 'gap-3')}>
          {SIGNUP_INPUT.map(({ value, type, label }) => (
            <Controller
              key={value}
              name={value}
              control={control}
              render={({ field }) => (
                <AuthInput
                  label={label}
                  name={field.name}
                  type={type}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors[value]?.message}
                  options={
                    type === 'select' ? KLEAGUE_TEAMS : undefined
                  }
                />
              )}
            />
          ))}
        </div>
        <AuthButtons
          onButtonClick={handleSignup}
          isDisabled={!isValid}
        />
      </div>
    </div>
  )
}

export default Page

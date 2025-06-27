import * as z from 'zod/v4'

const validationsSchema = z
  .object({
    name: z.string().min(1, '이름은 필수입력 항목입니다.'),
    nickname: z.string().min(2, '닉네임은 두글자 이상이어야 합니다.'),
    email: z.email('올바른 이메일 형식이 아닙니다.'),
    password: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/,
        '특수문자를 포함한 8~20자리의 비밀번호를 입력해주세요.',
      )
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
      .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
    confirmPw: z.string().min(1, '비밀번호 확인은 필수입니다.'),
    phoneNumber: z
      .string()
      .regex(/^01[0-9]{8,9}$/, '휴대폰번호는 숫자만 입력해주세요.'),
    favoriteTeam: z.string().min(1, '좋아하는 구단을 선택해주세요.'),
  })
  .refine((data) => data.password === data.confirmPw, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPw'],
  })

export default validationsSchema

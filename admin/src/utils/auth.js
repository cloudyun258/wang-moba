import { auth } from '@/api/user'

// 验证 token 的有效性
export async function hasToken () {
  let token = false
  if (localStorage.getItem('token')) {
    const res = await auth()
    if (res.status == 0) token = true
  }
  return token
}
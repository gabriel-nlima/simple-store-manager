import S from 'fluent-json-schema'

export const loginSchema = S.object()
  .prop(
    'body',
    S.object()
      .prop('email', S.string())
      .required()
      .prop('password', S.string())
      .required()
  )
  .prop(
    'response',
    S.object().prop(
      '2xx',
      S.object()
        .prop('user', S.ref('userBody#'))
        .prop('refreshToken', S.string())
        .prop('accessToken', S.string())
    )
  )

export const userBodySchema = S.object()
  .id('userBody')
  .prop('email', S.string())
  .required()
  .prop('name', S.string())
  .required()
  .prop('_id', S.string())
  .prop('password', S.string())

export const registerSchema = S.object()
  .prop('body', S.ref('userBody#'))
  .prop(
    'response',
    S.object().prop(
      '2xx',
      S.object()
        .prop('user', S.ref('userBody#'))
        .prop('refreshToken', S.string())
        .prop('accessToken', S.string())
    )
  )

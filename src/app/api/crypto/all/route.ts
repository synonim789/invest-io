import ky from 'ky'

export const GET = async () => {
  try {
    const response = await ky(
      'https://api-pub.bitfinex.com/v2/conf/pub:list:currency'
    ).json<string[][]>()

    return Response.json({ data: response[0] })
  } catch (error) {
    return Response.json(
      { error: 'Something went wrong, please try again' },
      { status: 500 }
    )
  }
}

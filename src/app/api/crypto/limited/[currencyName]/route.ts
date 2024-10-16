import ky from 'ky'

export const GET = async ({
  params: { currencyName },
}: {
  params: { currencyName: string }
}) => {
  try {
    const response = await ky
      .get('https://api-pub.bitfinex.com/v2/conf/pub:list:pair:exchange')
      .json<string[][]>()

    const nestedArr = response[0]
    const result = nestedArr
      .filter((element) => element.startsWith(currencyName))
      .map((element) => {
        let newElement = element.substring(currencyName.length)
        if (newElement.startsWith(':')) {
          newElement = newElement.substring(1)
        }
        return newElement
      })

    return Response.json({ result })
  } catch (error) {
    return Response.json(
      { error: 'Something went wrong, Please try again' },
      { status: 500 }
    )
  }
}

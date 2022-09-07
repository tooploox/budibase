const bigQuery = require("@google-cloud/bigquery")
const BigQueryIntegration = require("../bigQuery")
jest.mock("@google-cloud/bigquery")

class TestConfiguration {
  constructor(config = {}) {
    this.integration = new BigQueryIntegration.integration(config) 
  }
}

describe("BigQuery Integration", () => {
  let config 

  beforeEach(() => {
    config = new TestConfiguration({
        projectId: 'projectId',
        email: 'someEmail@gmail.com',
        privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDUzve3Eqp3PRFN\nzcNkzPSNn2v3pUzuuaC1M8T073Qox7XQ3uDzjZ57Ne29y08p6qiJbLyOyAANrtuU\n6pzMS3zUs7+joP9WmX1WszdzKZB2aI6++cAwtbNo+A3TS4ybCfyJH+UG0QkMQ6Q3\npyQH+qs5Q3/B3OaQtgvcrhm0xA7ZE/tE3HrpIWkGGYO7peFctfft/ZT6PF4SGAc/\nTxovLX/+tPbMOcyVpBhB+Sq+AH00yIHFFDRMVrS7pMK++4A3YSQn/8d2yLjrp/jB\nRGUMzKYpMMP9Fr5G3CI9iLBL4cY8Qlqf7ktgat1xem4n9wX9DF3vGdLSN9KEATyz\nCSL6lpbtAgMBAAECggEAGxA5G4yhpilbfoAI9dRE04/vLJ7WglOUFwc+6IFdTeRc\nAHSfugmMGpI4qlblOejwRw3Piv7vVs4iebU+fJKrDOfRGs+aOVqqwHBpQFmMWCqi\n4LGlWex5pQNKytDEUGE8PvoR58SEuI0PoM4+PE+KH+2wHSjpH4UvTADOHxmB4+Q1\ntQlbAfuWUvg8PuEfEzo9F1ilhiklHuZc1ut6OAtdD80BooLd+Tl27kdJhvQAHInZ\njJCnD0/XuK8dgZyzSxjT1exNLSYsAXdeEWXb33dMz+MBzMqD3jXXdBCpOByubLGs\nsj50Tuf/BHc/i4TbnCuDRHX7JDJB6UEBuiHwI8p/cQKBgQD0pbn5xl3tasIEbhCn\n02UKDHpW7HnrqC+ElYwoVyfv6LGQfuCVEIfj9JbRhrTjh0OdPlMSa3ALsrN3z0Qe\nDxKFeMlEnrnfg2WpNGe7X0PIhbTkzDtNJePqxMCXmBOUh40RA2L+XV2Lswgn71uk\nfnd3UW+A/CY0+I/tgufqD7DjuQKBgQDerwNLwcKwromKucxkPGEHoid7tMFwpWug\n3QQqTHJyXQ59bjbYsqH7VSIY49MV1FhOYBPA9Mrcj0hdqn3+edKnQwM+WXfI4MK3\nd/o/wpmskIXBreQhKzzQr0CdvTEwkr+4CXUXfn00HqumoSacc8/gfSkUiZ7btoIw\nLR1UFB0O1QKBgHjs+fI2VPMnk+MwrFboLMc8x7Pzi4gqR+KXMQI3omv5bttne4by\n9th8a5gBp6PXllpBFjrClE2T9RXBg4AAHz2OKJ4cfu+2OSfb2XJKcmzJelKliKJn\nmjLPMgs8hmEiZ14DeIkWiUimI9/pdjjmshJuVFlDSXdhbXMPA6c0PlExAoGAcaWy\nMeyeVxuMmJ9AX/usrX+lVO4oNzxFVKDXqlq/ofw6E+u21Bs+rg2BzGAhb6eitcU0\n76o/CheaICuOB9zWlISP2DdC+eMznPz/W6EOWtKbYQBFSGRPslVuzdIrk5WhgORa\nvPXSIlJw2iaulPRKKFDYMWIXEBzyDnJH4IwvVE0CgYEA5XvZi5fsDh+zOnAvGmbH\n6amOgdLAQEXzyuFk7Q3bqPWzE5IbHu7dESC6V6vt3XXcrgi49fLa1YUuuLkJGlq9\nE3i0KGunR1jBlG86wZAgEYBZ+v8lqptflVR+UUNNTWzicH7EOtbn+3P9BrrU29aw\n6XXUZWEqYg4s54aQd/L1Ggs=\n-----END PRIVATE KEY-----\n'
    })
  })

  it("calls the read method with the correct params", async () => {
    const sql = "select * from users;"
    await config.integration.read({
      sql
    })
    expect(bigQuery.createQueryJob).toHaveBeenCalledWith(sql)
  })


  })

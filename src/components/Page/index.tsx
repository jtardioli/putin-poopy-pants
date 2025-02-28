import { FC, useEffect } from 'react'
import { Flex } from '@chakra-ui/layout'
import { Header } from '../Header'
import Head from 'next/head'
import { useWallet } from '../../context/wallet-provider'

export const Page: FC = ({ children }) => {
  const { activateBrowserWallet, account } = useWallet()

  useEffect(() => {
    try {
      activateBrowserWallet()
    } catch (e) {
      console.error(e)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Donate | Help Ukraine</title>
        <meta name="description" content="Donate your yield to help Ukraine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" backgroundColor="#005BBB">
        <Header />
        <main>{children}</main>
        <Footer />
      </Flex>
    </>
  )
}

const Footer = () => {
  return <Flex height="10%"></Flex>
}

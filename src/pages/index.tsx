import type { NextPage } from 'next'
import Image from 'next/image'
import NextLink from 'next/link'

import { useEffect } from 'react'

import { useTranslation } from '../utils/use-translation'

const germanTrans = require('../../public/locales/de/common.json')
const englishTrans = require('../../public/locales/en/common.json')
const spanishTrans = require('../../public/locales/es/common.json')
const frenchTrans = require('../../public/locales/fr/common.json')

const localisation = {
  de: germanTrans,
  en: englishTrans,
  es: spanishTrans,
  fr: frenchTrans
}

import { Button } from '@chakra-ui/button'
import { Heading, Flex, Text } from '@chakra-ui/layout'
import { confetti, blastConfetti } from '../utils/confetti'

const headerSizing = [1, 1.25, 1.5, 2.5]
const headerSizingSm = headerSizing.map((x) => `${x}em`)
const headerSizingLg = headerSizing.map((x) => `${x * 2}em`)

const Home: NextPage = () => {
  const translate = useTranslation(localisation)

  useEffect(() => {
    /**
     * Every few seconds, blast confetti at a random location.
     */
    const interval = setInterval(() => {
      const x = 0.5
      const y = -0.01

      confetti({
        particleCount: 50,
        angle: 90,
        startVelocity: 45,
        spread: 90,
        ticks: 500,
        origin: { x, y }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Flex
      flex="1"
      direction="column"
      justifyContent="center"
      width="100%"
      height="100%"
      onClick={(evt: any) => {
        blastConfetti(evt, true)
      }}
    >
      <Flex direction="column" alignItems="center" textAlign="center">
        <Flex direction="column" gap={4}>
          <Heading fontSize={headerSizingSm}>
            {translate('homepage-title')}{' '}
            <Text display="inline" color="ukraineYellow">
              Ukraine
            </Text>
          </Heading>

          <Flex fontWeight="bold" alignItems="end" gap={3}>
            <Text fontSize={headerSizingLg}>₴1,234,567.00</Text>
            <Text fontSize={headerSizingSm} paddingBottom="0.5em">
              {' '}
              {translate('donated')}
            </Text>
          </Flex>

          <Text
            color="rgba(255, 255, 255, 0.88)"
            fontWeight="bold"
            fontSize={headerSizingSm}
          >
            Ξ123,456.00
          </Text>
        </Flex>

        <NextLink href="/stake" passHref>
          <Button
            mt="5vh"
            color="black"
            w="180px"
            borderRadius="25px"
            bg="ukraineYellow"
            _hover={{
              bg: 'darkYellow'
            }}
            _active={{
              bg: 'darkYellow'
            }}
          >
            {translate('stake')}
          </Button>
        </NextLink>

        <NextLink href="/donate" passHref>
          <Button
            mt="2vh"
            color="black"
            bg="white"
            w="180px"
            borderRadius="25px"
            _hover={{
              bg: '#DDD'
            }}
            _active={{
              bg: '#DDD'
            }}
          >
            {translate('donate')}
          </Button>
        </NextLink>
      </Flex>

      <Flex
        display={['none', 'none', 'none', 'none', 'block']}
        position="fixed"
        bottom="0"
        right="55%"
        h="85%"
        w="700px"
        mr="50px"
      >
        <Image
          priority
          src="/statue.png"
          alt="Statue"
          layout="fill"
          objectFit="contain"
        />
      </Flex>
    </Flex>
  )
}

export default Home

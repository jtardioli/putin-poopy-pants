/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { useTranslation } from '../../utils/use-translation'

const germanTrans = require('../../../public/locales/de/navigation.json')
const englishTrans = require('../../../public/locales/en/navigation.json')
const spanishTrans = require('../../../public/locales/es/navigation.json')
const frenchTrans = require('../../../public/locales/fr/navigation.json')

const localisation = {
  de: germanTrans,
  en: englishTrans,
  es: spanishTrans,
  fr: frenchTrans
}

import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/layout'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link
} from '@chakra-ui/react'
import Davatar from '@davatar/react'
import {
  ChevronDownIcon,
  FireIcon,
  GlobeAltIcon,
  HeartIcon,
  InformationCircleIcon,
  KeyIcon,
  LoginIcon,
  MenuIcon,
  PlusCircleIcon,
  XIcon
} from '@heroicons/react/outline'
import { useWallet } from '../../context/wallet-provider'
import { shorten } from '../../utils/shorten'
import { NavButton } from './NavButton'
import { NavDrawerItem, NavItem } from './NavItem'

export const Header = () => {
  const { activateBrowserWallet, ens, account } = useWallet()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { locale } = useRouter()
  const translate = useTranslation(localisation)

  const navItems = [
    {
      text: translate('stake'),
      href: '/stake',
      icon: <KeyIcon className="h-6 w-6" />
    },
    {
      text: translate('mint'),
      href: '/mint',
      icon: <PlusCircleIcon className="h-6 w-6" />
    },
    {
      text: translate('donate'),
      href: '/donate',
      icon: <HeartIcon className="h-6 w-6" />
    },
    {
      text: translate('leaderboard'),
      href: '/leaderboard',
      icon: <FireIcon className="h-6 w-6" />
    },
    {
      text: translate('about'),
      href: '/about',
      icon: <InformationCircleIcon className="h-6 w-6" />
    }
  ]

  return (
    <header>
      <Stack direction={['column', 'column', 'row']} px={2} py={4}>
        <HStack
          justifyContent={['space-between']}
          w={'full'}
          mx={['auto', 'auto', 70]}
        >
          <NextLink href="/" passHref>
            <Link className="center flex-col sm:flex-row sm:gap-2">
              <span className="text-xl">🇺🇦</span>
              <Text fontSize={['0.75em', '1em', '1.2em']} fontWeight="bold">
                BUBKI
              </Text>
            </Link>
          </NextLink>

          <HStack>
            <HStack
              px={[4, 4, 0]}
              display={['none', 'none', 'none', 'flex']}
              gap={[4, 4, 4, 6]}
              mr={4}
              width="auto"
            >
              {navItems.map((navItem, index) => (
                <NavItem key={index} href={navItem.href}>
                  <Text className="capitalize">{navItem.text}</Text>
                </NavItem>
              ))}
            </HStack>

            <Menu>
              <MenuButton
                as={Button}
                bg="ukraineYellow"
                color="black"
                _hover={{
                  bg: 'darkYellow'
                }}
                _active={{
                  bg: 'darkYellow'
                }}
                rounded="full"
                py="3"
              >
                <Flex alignItems="center">
                  <GlobeAltIcon className="w-6 h-6 mr-2" />
                  <Text className="uppercase">{locale}</Text>
                  <ChevronDownIcon className="w-6 h-6 ml-2" />
                </Flex>
              </MenuButton>
              <MenuList bg="ukraineYellow" color="black">
                <MenuItem>
                  <NextLink
                    href=""
                    passHref
                    locale={locale === 'en' ? 'de' : 'en'}
                  >
                    <Text className="capitalize">{translate('english')}</Text>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink
                    href=""
                    passHref
                    locale={locale === 'fr' ? 'en' : 'fr'}
                  >
                    <Text className="capitalize">{translate('french')}</Text>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink
                    href=""
                    passHref
                    locale={locale === 'de' ? 'en' : 'de'}
                  >
                    <Text className="capitalize">{translate('german')}</Text>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink
                    href=""
                    passHref
                    locale={locale === 'es' ? 'en' : 'es'}
                  >
                    <Text className="capitalize">{translate('spanish')}</Text>
                  </NextLink>
                </MenuItem>
              </MenuList>
            </Menu>

            <NavButton ml="30px" onClick={activateBrowserWallet}>
              {account ? (
                <>
                  <Box>
                    <Davatar size={25} address={account} />
                  </Box>
                  <Text>{ens || shorten(account)}</Text>
                </>
              ) : (
                <>
                  <Text className="capitalize">{translate('connect')}</Text>
                  <LoginIcon className="w-5 h-5" />
                </>
              )}
            </NavButton>
            <Button
              backgroundColor="transparent"
              display={['flex', 'flex', 'flex', 'none']}
              color="white"
              _hover={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }}
              borderRadius="100%"
              onClick={onOpen}
            >
              {isOpen ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </Button>
          </HStack>
        </HStack>
      </Stack>

      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody background="#005BBB" px={2}>
            {navItems.map((navItem, index) => (
              <NavDrawerItem key={index} href={navItem.href}>
                <Flex alignItems="center" gap={3}>
                  {navItem.icon}
                  <Text>{navItem.text}</Text>
                </Flex>
              </NavDrawerItem>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  )
}

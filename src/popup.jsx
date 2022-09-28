import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client'
import {
    Box, Heading, HStack, VStack, Flex, IconButton, Text, Icon, Avatar, Tag,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Popover,
    PopoverAnchor,
    Button,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    AvatarBadge,
    PopoverCloseButton,
    PopoverTrigger,
    PopoverHeader

} from "@chakra-ui/react";
import { ChakraProvider } from '@chakra-ui/react'
import { HiOutlineHome } from 'react-icons/hi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RiDraftLine, RiAddLine } from 'react-icons/ri'
import axios from "axios";

function Popup() {
    const [Code, SetCode] = useState('')
    const [AccessToken, setAccessToken] = useState('')
    const posts = [{ name: "Abhinav's space" }, { name: "Aayush's space" }]
    const [Error, SetError] = useState('')
    const [Teams, SetTeams] = useState([])
    const [CurrentTeamAvatar, setCurrentTeamAvatar] = useState('')
    const [currentTeam, setCurrentTeam] = useState('')

    const gradients = [
        {
            backgroundColor: "#4158D0",
            backgroundImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"

        },
        {
            backgroundColor: "#0093E9",
            backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"

        },
        {
            backgroundColor: "#FFFFFF",
            backgroundImage: "linear-gradient(180deg, #FFFFFF 0%, #6284FF 50%, #FF0000 100%)"
        },
        {
            backgroundColor: "#D9AFD9",
            backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)"
        }

    ]


    chrome.storage.sync.get('code_1', function (code_1) {

        SetCode(code_1.code_1)
        if (typeof (AccessToken) == undefined) {
            GetMyAccessToken(code_1.code_1)
        }
    })


    chrome.storage.sync.get('access_token', function (access_token) {
        if (access_token) {
            setAccessToken(access_token.access_token)
        }
    })


    const GetMyAccessToken = async (Code) => {

        const data = await fetch(`https://api.clickup.com/api/v2/oauth/token?client_id=BZZXK4XXFJY7N4W2DUHC51GJUXXTZJV6&client_secret=NNTF60UY0728Z2XPM0YXKJGCVQIHFP69A1TTV2UGJWYMNPU9B60C5MAFTFI8T3NL&code=${Code}`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const jdata = await data.json()

        chrome.storage.sync.set({ 'access_token': jdata.access_token })
    }







    useEffect(() => {
        if (AccessToken !== '') {
            const GetMyteams = async () => {

                const data = await fetch("https://api.clickup.com/api/v2/team", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": AccessToken
                    }
                })

                const jdata = await data.json()
                SetTeams(jdata.teams)

            }
            GetMyteams()
        }
    }, [AccessToken])

    const setCurrentTeamWithGoogle = (id) => {
        if (id) {
            chrome.storage.sync.set({ 'team': id })

            let av = Teams?.find(item => item.id === id)
            setCurrentTeamAvatar(av.avatar)
        }
    }

    chrome.storage.sync.get('team', function (team_id) {
        if (typeof (team_id) !== undefined) {
            setCurrentTeam(team_id.team)

            let av = Teams?.find(item => item.id === team_id.team)
            setCurrentTeamAvatar(av?.avatar)
        }
        else {
            setCurrentTeam("")
        }
    })



    useEffect(() => {
        if (AccessToken) {
            const GetMyteams = async () => {

                try {
                    const data = axios.get("https://api.clickup.com/api/v2/team", {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": AccessToken
                        }
                    })
                    SetTeams(data.teams)

                } catch (error) {
                    SetError(error.message)
                }

            }
            GetMyteams()
        }
    }, [AccessToken])

    return (
        <VStack margin={0} padding={0} borderRadius={'5px'} w="400px" h="500px">
            <VStack spacing={10} p={6} w="100%" h="80%">
                <HStack w="100%" h="10%" alignItems={'center'}>
                    <VStack
                        spacing={1}
                        alignItems={'flex-start'} w="80%" h="100%">
                        <Heading size={'xl'} fontWeight={700} fontFamily={'monospace'}>
                            Saved posts
                        </Heading>
                        <HStack spacing={1}>
                            <Text fontSize={'13px'} fontWeight={700} fontFamily={'monospace'}>
                                4 posts inside
                            </Text>
                            <Text fontSize={'13px'} fontWeight={700} fontFamily={'monospace'} textDecoration={'underline'}>
                                list
                            </Text>
                        </HStack>
                    </VStack>
                    <Flex
                        alignItems={'center'} justifyContent={'center'} w="20%" h="100%">
                        <Popover>
                            <PopoverTrigger>
                                <Avatar src={CurrentTeamAvatar} cursor={'pointer'} />
                            </PopoverTrigger>
                            <PopoverContent w="max-content">
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Select team</PopoverHeader>
                                <PopoverBody>
                                    <VStack w="100%" spacing={3}>
                                        {
                                            Teams && Teams.length > 0 ? (
                                                Teams?.map((item, i) => (
                                                    <Box spacing={3} key={i}>
                                                        <Avatar
                                                            key={i}
                                                            src={item.avatar}
                                                            cursor={'pointer'} size={'sm'}>
                                                            <AvatarBadge boxSize='1.25em' bg='green.500' />
                                                        </Avatar>
                                                        <Button
                                                            bg="white"
                                                            size={'sm'}
                                                            onClick={() => setCurrentTeamWithGoogle(item.id)}
                                                            _hover={{ bg: 'purple.400', color: 'white' }}
                                                        >
                                                            {item.name}
                                                        </Button>
                                                    </Box>
                                                ))
                                            ) : (<Box>
                                                No teams
                                            </Box>)

                                        }
                                        <Button onClick={() => { chrome.storage.sync.clear() }} bg="purple.400" size={'xs'} color="white">
                                            Logout
                                        </Button>
                                    </VStack>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>

                    </Flex>
                </HStack>

                <Accordion
                    allowToggle
                    overflow={'scroll'} h="480px" w="100%">
                    {posts?.map((item, i) => (
                        <AccordionItem
                            borderTop={'none'}
                            borderColor={'gray.100'}
                            key={i} w="100%">
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Text
                                            fontSize={'25px'}
                                            fontWeight={700} fontFamily={'monospace'}>
                                            {item.name}
                                        </Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel
                                minH={'30vh'}
                                bg={'purple.50'}
                                bgImage={"url('/twirl.png')"}
                                bgPosition="right"
                                bgSize={'100%'}
                                bgRepeat="no-repeat"
                                pb={4}>
                                <VStack w="100%" h="100%">
                                    <Box w="100%" h="95%">
                                        Hey
                                    </Box>

                                    <Flex
                                        alignItems={'center'} justifyContent={'flex-start'} w="100%" h="5%">
                                        <Avatar
                                            size={'sm'}
                                            marginTop={'8'}
                                            name='Christian Nwamba' src='https://bit.ly/code-beast' />
                                    </Flex>
                                </VStack>
                            </AccordionPanel>

                            {/* <Tag
                            w="11%"
                            h="90%"
                            borderRadius={'300px'}
                                bg={gradients[Math.floor(Math.random() * gradients.length)].backgroundColor}
                                bgImage={gradients[Math.floor(Math.random() * gradients.length)].backgroundImage}
                                border={'5px solid white'}
                                marginTop={'8'}
                                >{""}</Tag> */}
                        </AccordionItem>
                    ))}
                </Accordion>
            </VStack>
            <HStack
                alignItems={'flex-start'} justifyContent={'center'} w="90%" h="15%">
                <HStack
                    bg="purple.50" borderRadius={'30px'}
                    px={5}
                    alignItems={'center'} justifyContent={'space-between'} w="95%" h="100%">
                    <HStack w="20%" h="100%">
                        <IconButton icon={<HiOutlineHome />}
                            bg={'purple.300'}
                            color={'white'}
                            size={'sm'} />
                        <Text fontSize={'15px'} fontWeight={700} fontFamily={'sans-serif'}>
                            Home
                        </Text>
                    </HStack>

                    <HStack justifyContent={'space-between'}
                        borderRadius={'30px'}
                        px={3} bg="purple.100" w="25%" h="50%">
                        <Icon
                            w={6}
                            h={6}
                            opacity={.7}
                            cursor={'pointer'}
                            _active={{ opacity: .9 }}
                            as={RiDraftLine}
                        />
                        <Icon
                            w={4}
                            h={4}
                            opacity={.7}
                            cursor={'pointer'}
                            _active={{ opacity: .9 }}
                            as={BsThreeDotsVertical} />

                    </HStack>
                </HStack>

                <HStack w="5%" h="100%">
                    <IconButton icon={<RiAddLine />}
                        size={'sm'}
                        bg={'purple.300'}
                        color={'white'} />
                </HStack>
            </HStack>

        </VStack>
    )
}



const root = ReactDOM.createRoot(document.getElementById("react-target"));

root.render(
    <ChakraProvider>
        <Popup />
    </ChakraProvider>
)

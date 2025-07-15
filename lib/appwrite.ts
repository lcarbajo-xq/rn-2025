import { CreateUserParams, SignInParams } from '@/type'
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query
} from 'react-native-appwrite'

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: 'com.louie-dev.rn2025',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: '687523f10008e7a293e3',
  bucketId: '6876b5080016fc7dc91a',
  userCollectionId: '6875241100027b6115c4',
  categoriesCollectionId: '68768776003a7f80deb1',
  menuCollectionId: '687687eb0009f489543e',
  customizationsId: '6876b3440026b49f2b9e',
  menuCustomizationsId: '6876b409002c6e49f22e'
}

export const client = new Client()

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform)

export const account = new Account(client)
export const databases = new Databases(client)
export const avatars = new Avatars(client)

export const createUser = async ({
  email,
  password,
  name
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)
    if (!newAccount) throw new Error('User not created')
    await signIn({ email, password })

    const avatarUrl = avatars.getInitialsURL(name)

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { account_id: newAccount.$id, email, name, avatar: avatarUrl }
    )
  } catch (error) {
    throw new Error(error as string)
  }
}

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    await account.createEmailPasswordSession(email, password)
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw new Error('Session not found')

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('account_id', currentAccount.$id)]
    )
    if (!currentUser) throw new Error('User not found')
    return currentUser.documents[0]
  } catch (error) {
    throw new Error(error as string)
  }
}

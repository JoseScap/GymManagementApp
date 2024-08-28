export type Page = CorePage | MemberPage | SubscriptionPage | ClassPage
type CorePage = 'Core:Home' | 'Core:Dashboard' | 'Core:Notification' | 'Core:MiSocio'
type MemberPage = 'Member:List' | 'Member:Create' | 'Member:Detail'
type SubscriptionPage = 'Subscription:List' | 'Subscription:Create' | 'Subscription:Detail'
type ClassPage = 'Class:List'

export type Params = Record<string, string | undefined>


export type Page = CorePage | MemberPage | SubscriptionPage
type CorePage = 'Core:Home' | 'Core:Dashboard' | 'Core:Notification'
type MemberPage = 'Member:List' | 'Member:Create' | 'Member:Detail'
type SubscriptionPage = 'Subscription:List' | 'Subscription:Create' | 'Subscription:Detail'

export type Params = Record<string, string | undefined>

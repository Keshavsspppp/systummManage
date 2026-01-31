"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Users, Send, Search, Calendar } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const mockDirectMessages = [
  { id: "1", name: "John Doe", lastMessage: "Thanks for the event update!", time: "2m ago", unread: 2, avatar: "JD" },
  { id: "2", name: "Sarah Smith", lastMessage: "When is the next meeting?", time: "1h ago", unread: 0, avatar: "SS" },
  { id: "3", name: "Mike Johnson", lastMessage: "Got the documents", time: "3h ago", unread: 1, avatar: "MJ" },
]

const mockGroupChats = [
  { id: "1", name: "Coding Club", lastMessage: "Event planning discussion", time: "30m ago", members: 45, unread: 5 },
  { id: "2", name: "Hackathon 2026 Team", lastMessage: "Venue confirmed!", time: "1h ago", members: 12, unread: 3 },
  { id: "3", name: "Drama Club", lastMessage: "Script review at 4 PM", time: "2h ago", members: 32, unread: 0 },
]

const mockEventChats = [
  { id: "1", eventName: "Web Dev Workshop", lastMessage: "Registration open now!", time: "15m ago", participants: 45, unread: 2 },
  { id: "2", eventName: "Cultural Fest 2026", lastMessage: "Volunteer list updated", time: "45m ago", participants: 120, unread: 0 },
]

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground mt-1">Chat with members and groups</p>
          </div>

          {/* Beta Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-4">
              <p className="text-sm text-blue-800">
                <strong>🚧 Coming Soon:</strong> Real-time messaging feature is under development. 
                UI structure is ready for backend integration.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Chat List */}
            <Card className="md:col-span-1">
              <CardHeader>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search messages..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="direct">
                  <TabsList className="w-full">
                    <TabsTrigger value="direct" className="flex-1">Direct</TabsTrigger>
                    <TabsTrigger value="groups" className="flex-1">Groups</TabsTrigger>
                    <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
                  </TabsList>

                  {/* Direct Messages */}
                  <TabsContent value="direct" className="m-0">
                    <div className="divide-y">
                      {mockDirectMessages.map((chat) => (
                        <div
                          key={chat.id}
                          onClick={() => setSelectedChat(chat.id)}
                          className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedChat === chat.id ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                              {chat.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium truncate">{chat.name}</p>
                                <span className="text-xs text-muted-foreground">{chat.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                            </div>
                            {chat.unread > 0 && (
                              <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {chat.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Group Chats */}
                  <TabsContent value="groups" className="m-0">
                    <div className="divide-y">
                      {mockGroupChats.map((chat) => (
                        <div
                          key={chat.id}
                          onClick={() => setSelectedChat(chat.id)}
                          className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedChat === chat.id ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <Users className="h-10 w-10 text-primary" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium truncate">{chat.name}</p>
                                <span className="text-xs text-muted-foreground">{chat.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                              <p className="text-xs text-muted-foreground">{chat.members} members</p>
                            </div>
                            {chat.unread > 0 && (
                              <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {chat.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Event Chats */}
                  <TabsContent value="events" className="m-0">
                    <div className="divide-y">
                      {mockEventChats.map((chat) => (
                        <div
                          key={chat.id}
                          onClick={() => setSelectedChat(chat.id)}
                          className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedChat === chat.id ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <Calendar className="h-10 w-10 text-primary" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium truncate">{chat.eventName}</p>
                                <span className="text-xs text-muted-foreground">{chat.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                              <p className="text-xs text-muted-foreground">{chat.participants} participants</p>
                            </div>
                            {chat.unread > 0 && (
                              <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {chat.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="md:col-span-2">
              {selectedChat ? (
                <>
                  <CardHeader className="border-b">
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>Active now</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {/* Messages Area */}
                    <div className="h-100 overflow-y-auto p-6 space-y-4">
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                          <p className="text-sm">Hey! Are you attending the workshop tomorrow?</p>
                          <span className="text-xs text-muted-foreground">10:30 AM</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[70%]">
                          <p className="text-sm">Yes! Looking forward to it. What time does it start?</p>
                          <span className="text-xs opacity-80">10:32 AM</span>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                          <p className="text-sm">It starts at 10 AM in Lab 204. Don't be late! 😊</p>
                          <span className="text-xs text-muted-foreground">10:35 AM</span>
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && message.trim()) {
                              // TODO: Send message
                              setMessage("")
                            }
                          }}
                        />
                        <Button disabled={!message.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="h-125 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">Select a conversation</p>
                    <p className="text-sm text-muted-foreground">Choose a chat from the list to start messaging</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}

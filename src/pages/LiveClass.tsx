import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Share2,
  Users,
  MessageCircle,
  Settings,
  Hand,
  Circle,
  PhoneOff,
  Camera,
  Monitor,
  Send,
  Smile,
  Paperclip,
  MoreVertical,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Wifi,
  WifiOff,
} from "lucide-react";

const LiveClass = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [participantCount, setParticipantCount] = useState(24);

  const participants = [
    { id: 1, name: "John Smith", avatar: "/placeholder.svg", isTeacher: true, isSpeaking: true },
    { id: 2, name: "Sarah Johnson", avatar: "/placeholder.svg", isOnline: true },
    { id: 3, name: "Mike Chen", avatar: "/placeholder.svg", isOnline: true, hasHandRaised: true },
    { id: 4, name: "Emma Davis", avatar: "/placeholder.svg", isOnline: true },
    { id: 5, name: "Alex Wilson", avatar: "/placeholder.svg", isOnline: false },
    { id: 6, name: "Lisa Brown", avatar: "/placeholder.svg", isOnline: true },
  ];

  const chatMessages = [
    { id: 1, user: "Sarah Johnson", message: "Can you repeat the last formula?", time: "2:34 PM", isTeacher: false },
    { id: 2, user: "Teacher", message: "Sure! The quadratic formula is: x = (-b ± √(b²-4ac)) / 2a", time: "2:35 PM", isTeacher: true },
    { id: 3, user: "Mike Chen", message: "Thanks! That's much clearer now", time: "2:36 PM", isTeacher: false },
    { id: 4, user: "Emma Davis", message: "Could you share the practice problems?", time: "2:37 PM", isTeacher: false },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message logic here
      setMessage("");
    }
  };

  useEffect(() => {
    // Simulate connection status changes
    const interval = setInterval(() => {
      setIsConnected(prev => Math.random() > 0.1 ? true : prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-between bg-card/80 backdrop-blur-sm rounded-lg p-4 border shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-destructive'}`} />
                <span className="font-semibold text-card-foreground">Mathematics - Grade 10</span>
                <Badge variant="secondary" className="animate-scale-in">
                  {isRecording ? "Recording" : "Live"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{participantCount} participants</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hover-scale">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="destructive" size="sm">
                <PhoneOff className="h-4 w-4 mr-2" />
                End Class
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Primary Video */}
            <Card className="overflow-hidden animate-scale-in shadow-xl">
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center animate-fade-in">
                    <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Video className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">John Smith (Teacher)</h3>
                    <p className="text-muted-foreground">Teaching: Quadratic Equations</p>
                  </div>
                </div>
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
                    <Button
                      size="sm"
                      variant={isVideoOn ? "secondary" : "destructive"}
                      className="rounded-full h-10 w-10 p-0 hover-scale"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant={isAudioOn ? "secondary" : "destructive"}
                      className="rounded-full h-10 w-10 p-0 hover-scale"
                      onClick={() => setIsAudioOn(!isAudioOn)}
                    >
                      {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant={isScreenSharing ? "default" : "secondary"}
                      className="rounded-full h-10 w-10 p-0 hover-scale"
                      onClick={() => setIsScreenSharing(!isScreenSharing)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant={isRecording ? "destructive" : "secondary"}
                      className="rounded-full h-10 w-10 p-0 hover-scale"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      <Circle className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full h-10 w-10 p-0 hover-scale"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Screen Share Indicator */}
                {isScreenSharing && (
                  <div className="absolute top-4 left-4 animate-fade-in">
                    <Badge variant="default">
                      <Monitor className="h-3 w-3 mr-1" />
                      Screen Sharing
                    </Badge>
                  </div>
                )}
              </div>
            </Card>

            {/* Participant Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {participants.slice(1, 5).map((participant) => (
                <Card key={participant.id} className="overflow-hidden hover-scale animate-fade-in">
                  <div className="relative aspect-video bg-muted/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    {/* Participant Status */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-white bg-black/60 px-2 py-1 rounded truncate">
                          {participant.name.split(' ')[0]}
                        </span>
                        <div className="flex gap-1">
                          {participant.hasHandRaised && (
                            <div className="bg-warning text-warning-foreground rounded-full p-1 animate-pulse">
                              <Hand className="h-3 w-3" />
                            </div>
                          )}
                          {!participant.isOnline && (
                            <div className="bg-destructive rounded-full p-1">
                              <WifiOff className="h-3 w-3 text-destructive-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Participants Panel */}
            <Card className="animate-slide-in-right">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Participants ({participantCount})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={participant.avatar} />
                            <AvatarFallback className="text-xs">{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                            participant.isOnline ? 'bg-success' : 'bg-muted'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{participant.name}</p>
                          {participant.isTeacher && (
                            <Badge variant="outline" className="text-xs">Teacher</Badge>
                          )}
                        </div>
                        <div className="flex gap-1">
                          {participant.hasHandRaised && (
                            <Hand className="h-4 w-4 text-warning animate-pulse" />
                          )}
                          {participant.isSpeaking && (
                            <div className="h-4 w-4 bg-success rounded-full animate-pulse" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Panel */}
            <Card className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-64 px-4">
                  <div className="space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="animate-fade-in">
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-medium ${msg.isTeacher ? 'text-primary' : 'text-foreground'}`}>
                                {msg.user}
                              </span>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                            <p className="text-sm text-foreground mt-1">{msg.message}</p>
                          </div>
                        </div>
                        <Separator className="mt-3" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleSendMessage} className="hover-scale">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Hand className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClass;
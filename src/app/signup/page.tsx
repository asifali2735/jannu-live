import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeartBeatIcon } from '@/components/icons/heart-beat-icon';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
       <div 
        className="absolute inset-0 -z-10"
        style={{
            background: 'linear-gradient(45deg, hsl(var(--primary)/0.2), hsl(var(--chart-2)/0.2), hsl(var(--chart-3)/0.2))',
            filter: 'blur(40px)',
            opacity: 0.4
        }}
       />
      <Card 
        className="mx-auto max-w-sm w-full bg-card/80 backdrop-blur-sm border-primary/20 shadow-2xl shadow-primary/10"
      >
        <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
                <HeartBeatIcon
                    className="h-8 w-8 text-primary"
                    style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }}
                />
                <CardTitle 
                    className="text-3xl font-headline"
                    style={{ textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))' }}
                >
                    Jannu Live
                </CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
                Enter your information to create an account
            </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="full-name" className="text-muted-foreground">Full name</Label>
                <Input id="full-name" placeholder="John Doe" required className="bg-secondary/50 border-primary/20 focus:border-primary focus:shadow-lg focus:shadow-primary/50" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-secondary/50 border-primary/20 focus:border-primary focus:shadow-lg focus:shadow-primary/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-muted-foreground">Password</Label>
              <Input id="password" type="password" className="bg-secondary/50 border-primary/20 focus:border-primary focus:shadow-lg focus:shadow-primary/50" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/30">
              Create an account
            </Button>
            <Button variant="outline" className="w-full border-primary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline text-primary">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

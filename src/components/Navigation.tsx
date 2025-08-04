import { Button } from "@/components/ui/button";

interface NavigationProps {
  currentScene: 'chai-stall' | 'mandir';
  onSceneChange: (scene: 'chai-stall' | 'mandir') => void;
}

export const Navigation = ({ currentScene, onSceneChange }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold bg-gradient-saffron bg-clip-text text-transparent">
              DesiVerse
            </h1>
            <span className="text-muted-foreground text-sm">॥ स्वागत है ॥</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={currentScene === 'chai-stall' ? 'saffron' : 'outline'}
              onClick={() => onSceneChange('chai-stall')}
              className="font-medium"
            >
              🫖 Chai Stall
            </Button>
            <Button
              variant={currentScene === 'mandir' ? 'golden' : 'outline'}
              onClick={() => onSceneChange('mandir')}
              className="font-medium"
            >
              🛕 Mandir
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
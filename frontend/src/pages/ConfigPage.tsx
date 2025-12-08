import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs'
import SettingEditor from '../components/SettingEditor'
import CharacterEditor from '../components/CharacterEditor'
import OutlineEditor from '../components/OutlineEditor'
import StyleGuideEditor from '../components/StyleGuideEditor'

export default function ConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">配置管理</h1>
        <p className="text-muted-foreground">
          管理项目的基础设定，包括世界观、角色、大纲等
        </p>
      </div>

      <Tabs defaultValue="setting" className="w-full">
        <TabsList>
          <TabsTrigger value="setting">世界观设定</TabsTrigger>
          <TabsTrigger value="characters">角色管理</TabsTrigger>
          <TabsTrigger value="outline">小说大纲</TabsTrigger>
          <TabsTrigger value="style">风格指南</TabsTrigger>
        </TabsList>

        <TabsContent value="setting">
          <SettingEditor />
        </TabsContent>

        <TabsContent value="characters">
          <CharacterEditor />
        </TabsContent>

        <TabsContent value="outline">
          <OutlineEditor />
        </TabsContent>

        <TabsContent value="style">
          <StyleGuideEditor />
        </TabsContent>
      </Tabs>
    </div>
  )
}


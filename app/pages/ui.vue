<!-- pages/components.vue -->
<template>
  <div class="page">
    <h1>Nuxt UI Component Examples</h1>

    <!-- Layout Components -->
    <section>
      <h2>Layout Components</h2>
      
      <div>
        <h3>Alert</h3>
        <UAlert title="This is an alert" description="This is the alert description" />
      </div>
      
      <div>
        <h3>Avatar</h3>
        <div>
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
          <UAvatar alt="JD" />
        </div>
      </div>
      
      <div>
        <h3>AvatarGroup</h3>
        <UAvatarGroup :avatars="avatars" />
      </div>
      
      <div>
        <h3>Badge</h3>
        <div>
          <UBadge>Default</UBadge>
          <UBadge color="primary">Primary</UBadge>
          <UBadge color="success">Success</UBadge>
        </div>
      </div>
      
      <div>
        <h3>Button</h3>
        <div>
          <UButton>Default</UButton>
          <UButton color="primary">Primary</UButton>
          <UButton color="success">Success</UButton>
          <UButton icon="i-lucide-settings">With Icon</UButton>
        </div>
      </div>
      
      <div>
        <h3>ButtonGroup</h3>
        <UButtonGroup>
          <UButton>Button 1</UButton>
          <UButton>Button 2</UButton>
          <UButton>Button 3</UButton>
        </UButtonGroup>
      </div>
      
      <div>
        <h3>Card</h3>
        <UCard>
          <template #header>
            <div>Card Header</div>
          </template>
          This is the card content
          <template #footer>
            <div>
              <UButton color="primary">Action</UButton>
            </div>
          </template>
        </UCard>
      </div>
      
      <div>
        <h3>Container</h3>
        <UContainer>
          <div>Container content</div>
        </UContainer>
      </div>
      
      <div>
        <h3>Separator</h3>
        <USeparator />
      </div>
      
      <div>
        <h3>Icon</h3>
        <div>
          <UIcon name="i-lucide-home" />
          <UIcon name="i-lucide-settings" />
          <UIcon name="i-lucide-user" />
        </div>
      </div>
      
      <div>
        <h3>Kbd</h3>
        <div>Press <UKbd>Ctrl</UKbd> + <UKbd>C</UKbd> to copy</div>
      </div>
      
      <div>
        <h3>Link</h3>
        <ULink to="/dashboard">Dashboard Link</ULink>
      </div>
    </section>

    <!-- Form Components -->
    <section>
      <h2>Form Components</h2>
      
      <div>
        <h3>Checkbox</h3>
        <UCheckbox v-model="formData.checkbox" label="Check me" />
      </div>
      
      <!-- Removed UFormGroup block -->
      
      <div>
        <h3>Input</h3>
        <UInput v-model="formData.input" placeholder="Type something..." />
      </div>
      
      <div>
        <h3>InputMenu</h3>
        <UInputMenu v-model="formData.inputMenu" :options="inputOptions" placeholder="Select an option..." />
      </div>
      
      <div>
        <h3>InputNumber</h3>
        <UInputNumber v-model="formData.number" placeholder="Enter a number" />
      </div>
      
      <div>
        <h3>PinInput</h3>
        <!-- modelValue is an array -->
        <UPinInput v-model="formData.pin" :length="4" />
      </div>
      
      <div>
        <h3>RadioGroup</h3>
        <URadioGroup v-model="formData.radio" :options="radioOptions" />
      </div>
      
      <div>
        <h3>Select</h3>
        <USelect v-model="formData.select" :options="selectOptions" placeholder="Select an option" />
      </div>
      
      <div>
        <h3>SelectMenu</h3>
        <USelectMenu v-model="formData.selectMenu" :options="selectOptions" placeholder="Select an option" />
      </div>
      
      <div>
        <h3>Slider</h3>
        <USlider v-model="formData.slider" />
      </div>
      
      <div>
        <h3>Switch</h3>
        <USwitch v-model="formData.switch" />
      </div>
      
      <div>
        <h3>Textarea</h3>
        <UTextarea v-model="formData.textarea" placeholder="Enter text..." />
      </div>
    </section>

    <!-- Data Display Components -->
    <section>
      <h2>Data Display Components</h2>
      
      <div>
        <h3>Accordion</h3>
        <UAccordion :items="accordionItems" />
      </div>
      
      <div>
        <h3>Calendar</h3>
        <p>Calendar component temporarily removed</p>
      </div>
      
      <div>
        <h3>Pagination</h3>
        <UPagination v-model="pagination.page" :total="pagination.total" :page-size="10" />
      </div>
      
      <div>
        <h3>Progress</h3>
        <UProgress :value="75" />
      </div>
      
      <div>
        <h3>Skeleton</h3>
        <USkeleton />
      </div>
      
      <div>
        <h3>Table</h3>
        <UTable :columns="tableColumns" :rows="tableRows" />
      </div>
      
      <div>
        <h3>Tabs</h3>
        <UTabs :items="tabItems" />
      </div>
      
      <div>
        <h3>Tree</h3>
        <UTree :items="treeItems" />
      </div>
    </section>
    
    <!-- Overlay Components -->
    <section>
      <h2>Overlay Components</h2>
      
      <div>
        <h3>Drawer</h3>
        <UButton @click="isDrawerOpen = true">Open Drawer</UButton>
        <UDrawer v-model="isDrawerOpen">
          <div>
            <h3>Drawer Content</h3>
            <p>This is a drawer component.</p>
          </div>
        </UDrawer>
      </div>
      
      <div>
        <h3>DropdownMenu</h3>
        <UDropdownMenu :items="dropdownItems">
          <UButton>Open Dropdown</UButton>
        </UDropdownMenu>
      </div>
      
      <div>
        <h3>Modal</h3>
        <UButton @click="isModalOpen = true">Open Modal</UButton>
        <UModal v-model="isModalOpen">
          <div>
            <h3>Modal Content</h3>
            <p>This is a modal component.</p>
          </div>
        </UModal>
      </div>
      
      <div>
        <h3>Popover</h3>
        <UPopover>
          <UButton>Open Popover</UButton>
          <template #panel>
            <div>
              <h3>Popover Content</h3>
              <p>This is a popover component.</p>
            </div>
          </template>
        </UPopover>
      </div>
      
      <div>
        <h3>Slideover</h3>
        <UButton @click="isSlideoverOpen = true">Open Slideover</UButton>
        <USlideover v-model="isSlideoverOpen">
          <template #header>
            <div>
              <h3>Slideover Title</h3>
              <UButton icon="i-lucide-x" variant="ghost" @click="isSlideoverOpen = false" />
            </div>
          </template>
          <div>
            <p>This is a slideover component.</p>
          </div>
        </USlideover>
      </div>
      
      <div>
        <h3>Toast</h3>
        <UButton @click="showToast">Show Toast</UButton>
      </div>
      
      <div>
        <h3>Tooltip</h3>
        <UTooltip text="This is a tooltip">
          <UButton>Hover me</UButton>
        </UTooltip>
      </div>
    </section>
    
    <!-- Navigation Components -->
    <section>
      <h2>Navigation Components</h2>
      
      <div>
        <h3>Breadcrumb</h3>
        <UBreadcrumb :links="breadcrumbLinks" />
      </div>
      
      <div>
        <h3>Chip</h3>
        <div>
          <UChip>Default Chip</UChip>
          <UChip color="primary" closable>Primary Chip</UChip>
        </div>
      </div>
      
      <div>
        <h3>Collapsible</h3>
        <UCollapsible>
          <template #toggle="{ open }">
            <UButton :icon="open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" variant="ghost">
              Toggle Content
            </UButton>
          </template>
          <div>
            This is collapsible content.
          </div>
        </UCollapsible>
      </div>
      
      <div>
        <h3>ContextMenu</h3>
        <UContextMenu :items="contextMenuItems">
          <div>
            Right-click here to open context menu
          </div>
        </UContextMenu>
      </div>
      
      <div>
        <h3>NavigationMenu</h3>
        <UNavigationMenu :items="navigationItems" />
      </div>
      
      <div>
        <h3>Stepper</h3>
        <!-- Changed prop from "steps" to "items" and removed state -->
        <UStepper v-model="formData.step" :items="stepperSteps" />
      </div>
    </section>
    
    <!-- Miscellaneous Components -->
    <section>
      <h2>Miscellaneous Components</h2>
      
      <div>
        <h3>Carousel</h3>
        <UCarousel :items="carouselItems">
          <template #item="{ item }">
            <div>
              {{ item.title }}
            </div>
          </template>
        </UCarousel>
      </div>
      
      <div>
        <h3>ColorPicker</h3>
        <!-- Removed state prop -->
        <UColorPicker v-model="formData.color" />
      </div>
      
      <div>
        <h3>CommandPalette</h3>
        <UButton @click="isCommandPaletteOpen = true">Open Command Palette</UButton>
        <UCommandPalette 
          v-model="isCommandPaletteOpen" 
          :groups="commandPaletteGroups" 
          placeholder="Search commands..."
        />
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

// Form data
const formData = ref({
  checkbox: false,
  name: '',
  email: '',
  input: '',
  inputMenu: '',
  number: 0,
  pin: [], // Use an array for UPinInput
  radio: 'option1',
  select: '',
  selectMenu: '',
  slider: 50,
  switch: false,
  textarea: '',
  date: new Date(),
  step: 0,
  color: '#3B82F6'
})


// Options for inputs
const inputOptions = ref(['Option 1', 'Option 2', 'Option 3'])
const radioOptions = ref([
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
])
const selectOptions = ref([
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
])

// Avatar data
const avatars = ref([
  { src: 'https://i.pravatar.cc/150?img=1', alt: 'Avatar 1' },
  { src: 'https://i.pravatar.cc/150?img=2', alt: 'Avatar 2' },
  { src: 'https://i.pravatar.cc/150?img=3', alt: 'Avatar 3' },
  { src: 'https://i.pravatar.cc/150?img=4', alt: 'Avatar 4' }
])

// Accordion items
const accordionItems = ref([
  {
    label: 'Accordion Item 1',
    content: 'This is the content for accordion item 1.',
    defaultOpen: true
  },
  {
    label: 'Accordion Item 2',
    content: 'This is the content for accordion item 2.'
  },
  {
    label: 'Accordion Item 3',
    content: 'This is the content for accordion item 3.'
  }
])

// Pagination data
const pagination = ref({
  page: 1,
  total: 100
})

// Table data
const tableColumns = ref([
  { key: 'name', label: 'Name', id: 'name-col' },
  { key: 'email', label: 'Email', id: 'email-col' },
  { key: 'role', label: 'Role', id: 'role-col' }
])
const tableRows = ref([
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
])

// Tab items
const tabItems = ref([
  { label: 'Tab 1', content: 'This is tab 1 content' },
  { label: 'Tab 2', content: 'This is tab 2 content' },
  { label: 'Tab 3', content: 'This is tab 3 content' }
])

// Tree items
const treeItems = ref([
  {
    label: 'Directory 1',
    children: [
      { label: 'File 1.1' },
      { label: 'File 1.2' }
    ]
  },
  {
    label: 'Directory 2',
    children: [
      { label: 'File 2.1' },
      { 
        label: 'Subdirectory 2.2',
        children: [
          { label: 'File 2.2.1' }
        ]
      }
    ]
  }
])

// Overlay component states
const isDrawerOpen = ref(false)
const isModalOpen = ref(false)
const isSlideoverOpen = ref(false)
const isCommandPaletteOpen = ref(false)

// Dropdown items
const dropdownItems = ref([
  [
    { label: 'Edit', icon: 'i-lucide-pencil' },
    { label: 'Duplicate', icon: 'i-lucide-copy' }
  ],
  [
    { label: 'Delete', icon: 'i-lucide-trash' }
  ]
])

// Context menu items
const contextMenuItems = ref([
  [
    { label: 'Back', icon: 'i-lucide-arrow-left' },
    { label: 'Forward', icon: 'i-lucide-arrow-right' },
    { label: 'Reload', icon: 'i-lucide-refresh-cw' }
  ],
  [
    { label: 'Save As...', icon: 'i-lucide-save' },
    { label: 'Print...', icon: 'i-lucide-printer' }
  ]
])

// Breadcrumb links - all now point to /dashboard
const breadcrumbLinks = ref([
  { label: 'Home', to: '/dashboard' },
  { label: 'Components', to: '/dashboard' },
  { label: 'Current Page', to: '/dashboard' }
])

// Navigation menu items - updated routes to /dashboard
const navigationItems = ref([
  [
    { label: 'Documentation', icon: 'i-lucide-book-open', to: '/dashboard' },
    { label: 'Components', icon: 'i-lucide-component', to: '/dashboard', active: true },
    { label: 'Settings', icon: 'i-lucide-settings', to: '/dashboard' }
  ]
])

// Stepper steps (passed as items)
const stepperSteps = ref([
  { title: 'Step 1', description: 'First step description' },
  { title: 'Step 2', description: 'Second step description' },
  { title: 'Step 3', description: 'Third step description' }
])

// Carousel items
const carouselItems = ref([
  { title: 'Slide 1' },
  { title: 'Slide 2' },
  { title: 'Slide 3' }
])

// Command palette groups
const commandPaletteGroups = ref([
  {
    id: 'navigation',
    label: 'Navigation',
    commands: [
      { id: 'home', label: 'Go to Home', icon: 'i-lucide-home' },
      { id: 'settings', label: 'Go to Settings', icon: 'i-lucide-settings' },
      { id: 'profile', label: 'Go to Profile', icon: 'i-lucide-user' }
    ]
  },
  {
    id: 'actions',
    label: 'Actions',
    commands: [
      { id: 'new', label: 'Create New Document', icon: 'i-lucide-file-plus' },
      { id: 'save', label: 'Save Document', icon: 'i-lucide-save' }
    ]
  }
])

// Toast function
const showToast = () => {
  alert('Toast functionality would appear here')
}
</script>
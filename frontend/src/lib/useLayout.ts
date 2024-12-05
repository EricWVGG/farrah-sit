import { create, StateCreator } from 'zustand'

interface LayoutState {
  projectType?: string
  setProjectType: (s?: string) => void

  indexActive: boolean
  setIndexActive: (a?: boolean) => void
  toggleIndex: () => void

  navActive: boolean
  setNavActive: (a?: boolean) => void
  toggleNav: () => void

  aboutActive: boolean
  setAboutActive: (a?: boolean) => void
  toggleAbout: () => void

  compressionLevel: number
  setCompressionLevel: (n: number) => void
}

const createNavState: StateCreator<LayoutState> = (set) => ({
  setProjectType: (projectType) => set({ projectType }),

  indexActive: false,
  setIndexActive: (indexActive) => set({ indexActive }),
  toggleIndex: () => set((state) => ({ indexActive: !state.indexActive })),

  navActive: false,
  setNavActive: (navActive) => set({ navActive }),
  toggleNav: () => set((state) => ({ navActive: !state.navActive })),

  aboutActive: false,
  setAboutActive: (aboutActive) => set({ aboutActive }),
  toggleAbout: () => set((state) => ({ aboutActive: !state.aboutActive })),

  compressionLevel: 80,
  setCompressionLevel: (compressionLevel) => set({ compressionLevel }),
})

export default create<LayoutState>(createNavState)

import { create, StateCreator } from 'zustand'

type ModalType = 'CONTACT'

interface LayoutState {
  activeModal?: ModalType
  setActiveModal: (t?: ModalType) => void

  indexActive: boolean
  setIndexActive: (a?: boolean) => void
  toggleIndex: () => void

  navActive: boolean
  setNavActive: (a?: boolean) => void
  toggleNav: () => void

  aboutActive: boolean
  setAboutActive: (a?: boolean) => void
  toggleAbout: () => void

  transitioning: boolean
  setTransitioning: (b: boolean) => void

  specsActive: boolean
  setSpecsActive: (a?: boolean) => void
}

const createNavState: StateCreator<LayoutState> = (set) => ({
  activeModal: undefined,
  setActiveModal: (activeModal) => set({ activeModal }),

  indexActive: false,
  setIndexActive: (indexActive) => set({ indexActive }),
  toggleIndex: () =>
    set((state) => ({ indexActive: !state.indexActive, specsActive: false })),

  navActive: false,
  setNavActive: (navActive) => set({ navActive }),
  toggleNav: () =>
    set((state) => ({ navActive: !state.navActive, specsActive: false })),

  aboutActive: false,
  setAboutActive: (aboutActive) => set({ aboutActive }),
  toggleAbout: () =>
    set((state) => ({ aboutActive: !state.aboutActive, specsActive: false })),

  transitioning: true,
  setTransitioning: (transitioning: boolean) =>
    set({ transitioning, specsActive: false }),

  specsActive: false,
  setSpecsActive: (specsActive) => set({ specsActive }),
})

export default create<LayoutState>(createNavState)

import type { Directive } from 'vue'

/**
 * v-reveal directive — adds a scroll-triggered reveal animation.
 * Uses IntersectionObserver to add `.is-visible` class when element enters viewport.
 *
 * Usage:
 *   <div v-reveal>...</div>           // default: fade-up
 *   <div v-reveal="'fade'">...</div>  // fade only
 *   <div v-reveal="'scale'">...</div> // scale-in
 *   <div v-reveal="200">...</div>     // delay 200ms
 */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement
        const delay = el.dataset.revealDelay
        if (delay) {
          el.style.transitionDelay = `${delay}ms`
        }
        el.classList.add('is-visible')
        observer.unobserve(el)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
)

export const vReveal: Directive<HTMLElement, string | number | undefined> = {
  mounted(el, binding) {
    // Determine animation type
    const type = typeof binding.value === 'string' ? binding.value : 'fade-up'
    el.classList.add('reveal', `reveal--${type}`)

    // Store delay if numeric
    if (typeof binding.value === 'number') {
      el.dataset.revealDelay = String(binding.value)
    }

    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  },
}

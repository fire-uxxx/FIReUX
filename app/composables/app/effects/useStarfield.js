export function useStarfield() {
  const initializeStars = () => {
    const stars = document.querySelectorAll('.star')

    stars.forEach(star => {
      // Random horizontal position only
      star.style.left = `${Math.random() * 100}%`

      // Start at random positions in the animation cycle
      // This ensures they don't all disappear at once
      const startingPoint = Math.random() * 100
      star.style.top = `${startingPoint}%`

      // Set initial transform to match where they should be in animation
      const initialYPos = 100 - startingPoint
      star.style.transform = `translateY(${initialYPos}vh)`

      // Random size
      const size = Math.random() * 1.5 + 1
      star.style.width = `${size}px`
      star.style.height = `${size}px`

      // Random initial opacity (0.1 to 0.5)
      const initialOpacity = Math.random() * 0.4 + 0.1
      star.style.opacity = initialOpacity

      // Random durations
      const twinkleDuration = Math.random() * 3 + 3
      // Slower upward movement
      const moveDuration = Math.random() * 220 + 220

      // Set different delays for twinkle and moveUp
      // Use negative delay for moveUp to start mid-animation
      const moveDelay = -(moveDuration * (startingPoint / 100))
      const twinkleDelay = Math.random() * 2

      star.style.animationDelay = `${twinkleDelay}s, ${moveDelay}s`
      star.style.animationDuration = `${twinkleDuration}s, ${moveDuration}s`
    })
  }

  return {
    initializeStars
  }
}

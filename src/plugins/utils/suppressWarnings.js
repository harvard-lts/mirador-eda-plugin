import { version as miradorVersion } from "mirador/package.json"

// In Mirador version 3x there is a deprecation console warning:
// Warning: Failed prop type: Material-UI: `overlap="rectangle"` was deprecated. Use `overlap="rectangular"` instead.
// This was fixed in Mirador version 4.0.0
// https://github.com/ProjectMirador/mirador/commit/90e695e0df5df44174a023cfae367a76e5697760

// Suppressing this error to improve developer experience

const FIXED_VERSION = "4.0.0"

const parsedCurrentVersion = parseInt(miradorVersion.replace(/\./g, ""))
const parsedFixedVersion = parseInt(FIXED_VERSION.replace(/\./g, ""))

// Once the version is greater than or equal to the fixed version, we can remove this suppression
if (parsedCurrentVersion >= parsedFixedVersion) {
  console.log(
    "⚠️ Warning suppression for Material-UI Badge overlap prop may no longer be needed.\n" +
    "  Current Mirador version: " + miradorVersion + "\n" +
    "  Fixed in version: " + FIXED_VERSION + "\n" +
    "  Consider removing src/plugins/utils/suppressWarnings.js"
  )
} else {
  const originalConsoleError = console.error

  console.error = (...args) => {
    const suppressedWarnings = [
      "Material-UI: `overlap=\"rectangle\"` was deprecated. Use `overlap=\"rectangular\"` instead.",
    ]

    const shouldSuppress = suppressedWarnings.some(warning =>
      args[0]?.includes && args[0].includes(warning)
    )

    if (!shouldSuppress) {
      originalConsoleError.apply(console, args)
    }
  }
}



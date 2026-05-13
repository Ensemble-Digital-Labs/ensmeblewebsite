# Session log – 2026-05-13

## Summary

Fixed the **dark horizontal strip** between the problem band and **“Did you know?”**: `margin-bottom` on the pain `<ul>` sat **outside** the relative box that holds the absolute wash, so **`inset-0` did not paint that strip** and flat `#050816` showed through. Replaced with **`padding-bottom` on the list wrapper** and **`mb-0` on the `<ul>`**. Reduced the “two cards” read by using **`rounded-b-2xl rounded-t-none`**, **`border-t-0`**, and dropping the aside **top border**.

## Changes

- Edited `src/components/sections/HomeProblemSection.jsx` — list wrapper `pb-6 sm:pb-8`; `ul` `mb-0`; Did-you-know shell `rounded-b-2xl` + `border-t-0`; aside without `border-t`.

## Notes

- Padding lives **inside** the positioned ancestor, so the ambient image + gradient cover the spacer.

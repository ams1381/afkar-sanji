import { PopoverContainer , PopoverButtonHolder , PopOverButton} from '@/styles/folders/cornerAdd';
import React from 'react'

const AddPopoverContent = () => {
  return (
    <PopoverContainer>
        <PopoverButtonHolder>
            <p>اضافه کردن پوشه</p>
            <PopOverButton>
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0V3.5C8 4.32843 8.67157 5 9.5 5H13V12.5C13 13.3284 12.3284 14 11.5 14H7.66308C9.07655 13.0046 10 11.3602 10 9.5C10 6.46243 7.53757 4 4.5 4C3.97999 4 3.47683 4.07217 3 4.20703V1.5C3 0.671573 3.67157 0 4.5 0H8ZM9 0.25V3.5C9 3.77614 9.22386 4 9.5 4H12.75L9 0.25ZM9 9.5C9 11.9853 6.98528 14 4.5 14C2.01472 14 0 11.9853 0 9.5C0 7.01472 2.01472 5 4.5 5C6.98528 5 9 7.01472 9 9.5ZM5 7.5C5 7.22386 4.77614 7 4.5 7C4.22386 7 4 7.22386 4 7.5V9H2.5C2.22386 9 2 9.22386 2 9.5C2 9.77614 2.22386 10 2.5 10H4L4 11.5C4 11.7761 4.22386 12 4.5 12C4.77614 12 5 11.7761 5 11.5V10H6.5C6.77614 10 7 9.77614 7 9.5C7 9.22386 6.77614 9 6.5 9H5V7.5Z" fill="#EEF0FF"/>
                </svg>
            </PopOverButton>
        </PopoverButtonHolder>
        <PopoverButtonHolder>
            <p>اضافه کردن نظر سنجی</p>
            <PopOverButton>
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0V3.5C8 4.32843 8.67157 5 9.5 5H13V12.5C13 13.3284 12.3284 14 11.5 14H7.66308C9.07655 13.0046 10 11.3602 10 9.5C10 6.46243 7.53757 4 4.5 4C3.97999 4 3.47683 4.07217 3 4.20703V1.5C3 0.671573 3.67157 0 4.5 0H8ZM9 0.25V3.5C9 3.77614 9.22386 4 9.5 4H12.75L9 0.25ZM9 9.5C9 11.9853 6.98528 14 4.5 14C2.01472 14 0 11.9853 0 9.5C0 7.01472 2.01472 5 4.5 5C6.98528 5 9 7.01472 9 9.5ZM5 7.5C5 7.22386 4.77614 7 4.5 7C4.22386 7 4 7.22386 4 7.5V9H2.5C2.22386 9 2 9.22386 2 9.5C2 9.77614 2.22386 10 2.5 10H4L4 11.5C4 11.7761 4.22386 12 4.5 12C4.77614 12 5 11.7761 5 11.5V10H6.5C6.77614 10 7 9.77614 7 9.5C7 9.22386 6.77614 9 6.5 9H5V7.5Z" fill="#EEF0FF"/>
                </svg>
            </PopOverButton>
        </PopoverButtonHolder>
    </PopoverContainer>
  )
}
export default AddPopoverContent;
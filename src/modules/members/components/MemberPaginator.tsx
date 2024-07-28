import {Box, Button, ButtonPropsColorOverrides, ButtonPropsVariantOverrides, iconButtonClasses} from "@mui/joy";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/joy/IconButton";
import {useMemberList} from "../hooks/useMemberListHooks.ts";
import {useMemo} from "react";
import {generatePaginationItems} from "../utils/arrayUtils.ts";

// True means exist next or prev page
const buttonVariantDictionary: Record<boolean, ButtonPropsVariantOverrides> = {
  true: 'outlined',
  false: 'plain'
}

// True means exist next or prev page
const buttonColorDictionary: Record<boolean, ButtonPropsColorOverrides> = {
  true: 'primary',
  false: 'neutral'
}

// True means this is the current page
const paginationVariantIconButton: Record<boolean, ButtonPropsVariantOverrides> = {
  true: 'solid',
  false: 'outlined'
}

// True means this is the current page
const paginationColorIconButton: Record<boolean, ButtonPropsColorOverrides> = {
  true: 'primary',
  false: 'neutral'
}

const MemberPaginator: React.FC = () => {
  const {
    currentPage: {
      prev,
      next,
      pages
    },
    numberPage,
    changeNumberPage
  } = useMemberList()

  const paginationItems = useMemo<string[]>(() => {
    return generatePaginationItems(numberPage, pages)
  }, [numberPage, pages])

  return <Box
    className="Pagination-laptopUp"
    sx={{
      pt: 2,
      gap: 1,
      [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
      display: {
        xs: 'none',
        md: 'flex',
      },
    }}
  >
    <Button
      size="sm"
      variant={buttonVariantDictionary[prev !== null]}
      color={buttonColorDictionary[prev !== null]}
      disabled={prev === null}
      startDecorator={<KeyboardArrowLeftIcon />}
      onClick={() => prev !== null && changeNumberPage(prev)}
    >
      Previous
    </Button>

    <Box sx={{ flex: 1 }} />
    {paginationItems.map((page, index) => (
      <IconButton
        key={index}
        size="sm"
        variant={paginationVariantIconButton[numberPage === +page]}
        color={paginationColorIconButton[numberPage === +page]}
        onClick={() => !isNaN(+page) && changeNumberPage(+page)}
      >
        {page}
      </IconButton>
    ))}
    <Box sx={{ flex: 1 }} />

    <Button
      size="sm"
      variant={buttonVariantDictionary[next !== null]}
      color={buttonColorDictionary[next !== null]}
      disabled={next === null}
      endDecorator={<KeyboardArrowRightIcon />}
      onClick={() => next !== null && changeNumberPage(next)}
    >
      Next
    </Button>
  </Box>
}

export default MemberPaginator
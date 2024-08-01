import {Box, Button, iconButtonClasses} from "@mui/joy";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/joy/IconButton";
import {useMemberList} from "../hooks/useMemberListHooks.ts";
import {useMemo} from "react";
import {generatePaginationItems} from "../utils/arrayUtils.ts";

const MemberPaginator: React.FC = () => {
  const {
    currentPage: {
      prev,
      next,
      pages,
      items
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
      display: items === 0 ? 'none' : 'flex',
    }}
  >
    <Button
      size="sm"
      variant={prev !== null ? "outlined" : "plain"}
      color={prev !== null ? "primary" : "neutral"}
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
        variant={numberPage === +page ? "solid" : "outlined"}
        color={numberPage === +page ? "primary" : "neutral"}
        onClick={() => !isNaN(+page) && changeNumberPage(+page)}
      >
        {page}
      </IconButton>
    ))}
    <Box sx={{ flex: 1 }} />

    <Button
      size="sm"
      variant={next !== null ? "outlined" : "plain"}
      color={next !== null ? "primary" : "neutral"}
      disabled={next === null}
      endDecorator={<KeyboardArrowRightIcon />}
      onClick={() => next !== null && changeNumberPage(next)}
    >
      Next
    </Button>
  </Box>
}

export default MemberPaginator
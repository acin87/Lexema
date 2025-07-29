import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Box, CircularProgress, IconButton, InputAdornment, List, ListItem, TextField, Tooltip } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, SiteAppRoutePath } from '../../app/routes/Config';
import { useLazyGetAutocompleteQuery } from '../../entities/user/api/userApi';
import { Autocomplete } from '../../entities/user/types/UserTypes';
import HighlightText from './HighlightText';
import styles from './SearchField.module.css';
/**
 * Компонент для отображения поля поиска
 * @returns Компонент для отображения поля поиска
 */
const SearchAutocomplete: FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Autocomplete[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [fetchSuggestions, { isFetching, isUninitialized, isLoading: isLoadingSuggestions }] =
        useLazyGetAutocompleteQuery();
    const navigate = useNavigate();

    const getSuggestions = useCallback(async () => {
        if (searchTerm.length > 1) {
            try {
                const result = await fetchSuggestions({ q: searchTerm }).unwrap();
                setSuggestions(result.results);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Ошибка при получении подсказок:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchTerm, fetchSuggestions]);

    useEffect(() => {
        const timerId = setTimeout(getSuggestions, 300);
        return () => clearTimeout(timerId);
    }, [searchTerm, getSuggestions]);

    const isLoading = isFetching || isLoadingSuggestions;

    const handleSelect = useCallback(
        (searchResult: Autocomplete) => {
            navigate(SiteAppRoutePath[AppRoute.PROFILE].replace(':id', searchResult.id.toString()));
            setSuggestions([]);
            setShowSuggestions(false);
            setSearchTerm('');
        },
        [navigate],
    );

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '53%',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        width: '30rem',
                        flexGrow: 2,
                        '@media (max-width: 600px)': { display: 'none' },
                        '@media (max-width: 900px)': { display: 'none' },
                        position: 'relative',
                    }}
                >
                    <TextField
                        size="small"
                        variant="outlined"
                        sx={{ width: '30rem', backgroundColor: 'rgba(80, 181, 255, .2)' }}
                        placeholder="Найти..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
                        
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {isLoading && <CircularProgress size={20} />}
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {showSuggestions && (
                        <List
                            className={styles.suggestionsList}
                            sx={{
                                position: 'absolute',
                                p: 0,
                                backgroundColor: 'background.paper',
                                lineHeight: 'normal'
                            }}
                        >
                            {suggestions?.length > 0
                                ? suggestions.map((searchResult) => (
                                      <ListItem
                                          key={searchResult.id}
                                          onMouseDown={(e) => e.preventDefault()}
                                          onClick={() => handleSelect(searchResult)}
                                          className={styles.suggestionsLi}
                                          sx={{
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              '&:not(:last-child)': { borderBottom: '1px solid var(--primary-main)' },
                                              '&:hover': {
                                                  backgroundColor: 'rgba(80, 181, 255, .2)',
                                              },
                                          }}
                                      >
                                          <Box className={styles.userName}>
                                              <HighlightText user={searchResult} searchTerm={searchTerm} />
                                          </Box>
                                          <Tooltip title="Добавить в друзья">
                                              <IconButton
                                                  size="small"
                                                  sx={{ color: 'primary.main', '&:hover': { color: 'error.main' } }}
                                              >
                                                  <AddIcon />
                                              </IconButton>
                                          </Tooltip>
                                      </ListItem>
                                  ))
                                : !isFetching &&
                                  searchTerm.length > 1 &&
                                  !isUninitialized && (
                                      <ListItem className={styles.noResults}>Ничего не найдено</ListItem>
                                  )}
                        </List>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default SearchAutocomplete;

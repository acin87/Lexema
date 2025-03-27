import SearchIcon from '@mui/icons-material/Search';
import { Box, CircularProgress, InputAdornment, List, ListItem, TextField } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { useLazyGetUserAutocompleteQuery } from '../../../entities/user/api/userApi';
import { UserAutocomplete } from '../../../entities/user/types/UserTypes';
import HighlightText from './HighlightText';
import styles from './SearchField.module.css';
/**
 * Компонент для отображения поля поиска
 * @returns Компонент для отображения поля поиска
 */
const SearchAutocomplete: FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [suggestions, setSuggestions] = useState<UserAutocomplete[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserAutocomplete | null>(null);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [getSuggestions, { data: apiData, isFetching, isUninitialized, isLoading: isLoadingSuggestions }] =
        useLazyGetUserAutocompleteQuery();

    const fetchSuggestions = useCallback(async () => {
        if (searchTerm.length > 1) {
            getSuggestions({ q: searchTerm });
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, getSuggestions]);

    useEffect(() => {
        const timerId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timerId);
    }, [searchTerm, fetchSuggestions]);

    useEffect(() => {
        if (apiData !== undefined) {
            setSuggestions(apiData.results || []);
        }
    }, [apiData]);

    const isLoading = isFetching || isLoadingSuggestions;

    const handleSelect = useCallback((user: UserAutocomplete) => {
        setSelectedUser(user);
        setSearchTerm(`${user.first_name} ${user.last_name}`);
        setSuggestions([]);
        setShowSuggestions(false);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setSelectedUser(null);
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
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
                        onBlur={() => setTimeout(() => setShowSuggestions(true), 200)}
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
                    ></TextField>

                    {showSuggestions && (
                        <List
                            className={styles.suggestionsList}
                            sx={{
                                position: 'absolute',
                                p: 0,
                                backgroundColor: 'background.paper',
                            }}
                        >
                            {suggestions?.length > 0
                                ? suggestions.map((user) => (
                                      <ListItem
                                          key={user.id}
                                          onClick={() => handleSelect(user)}
                                          onMouseDown={(e) => e.preventDefault()}
                                          className={styles.suggestionsLi}
                                          sx={{
                                              '&:not(:last-child)': { borderBottom: '1px solid var(--primary-main)' },
                                          }}
                                      >
                                          <Box className={styles.userName}>
                                              <HighlightText text={user.first_name} searchTerm={searchTerm} />
                                          </Box>
                                      </ListItem>
                                  ))
                                : !isFetching &&
                                  searchTerm.length > 1 &&
                                  !isUninitialized && <li className="no-results">Ничего не найдено</li>}
                        </List>
                    )}
                </Box>
                {selectedUser && (
                    <div className="selected-user">
                        <h3>Выбран пользователь:</h3>
                        <p>
                            Имя: {selectedUser.first_name} {selectedUser.last_name}
                        </p>
                        <p>Логин: {selectedUser.username}</p>
                        <p>ID: {selectedUser.id}</p>
                    </div>
                )}
            </Box>
        </>
    );
    // return (
    //     <Box
    //         sx={{
    //             display: 'flex',
    //             alignItems: 'center',
    //             width: '30rem',
    //             flexGrow: 2,
    //             '@media (max-width: 600px)': { display: 'none' },
    //             '@media (max-width: 900px)': { display: 'none' },
    //         }}
    //     >
    //         <TextField
    //             size="small"
    //             variant="outlined"
    //             sx={{ width: '30rem', backgroundColor: 'rgba(80, 181, 255, .2)' }}
    //             slotProps={{
    //                 input: {
    //                     startAdornment: (
    //                         <InputAdornment position="start">
    //                             <SearchIcon />
    //                         </InputAdornment>
    //                     ),
    //                 },
    //             }}
    //         ></TextField>
    //     </Box>
    // );
};

export default SearchAutocomplete;

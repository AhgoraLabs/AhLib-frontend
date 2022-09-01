import React, { useEffect, useState, useContext } from "react";
import { Container } from './style'
import Button from '../../components/Button'
import moment from "moment";
import AuthContext from "../../context/auth/AuthContext";
import { BsPerson, BsCalendarDate } from "react-icons/bs";
import { AiOutlineBook } from "react-icons/ai";
import { fetchLoansByType } from '../../api/LoanService/index';
import { Link } from 'react-router-dom';


const Requests = ({ }) => {

	const [requestType, setRequestType] = useState('Pendentes');

	const [loans, setLoans] = useState([]);	

	const typeTranslate = {
		'pending': 'Pendentes',
		'late': 'Atrasados',
		'returned': 'Devolvidos',
	}

	const doLoanRequest = (type) => async () => {
		setRequestType(typeTranslate[type]);
		const loans = await fetchLoansByType(type);
		setLoans(loans.data);
	}

	const { user: { id: userId } } = useContext(AuthContext);

	useEffect(() => {
		doLoanRequest('pending')();
	}, []);


	return (
		<Container>
			<div id='menu'>
				<Button onClick={doLoanRequest('pending')} height='h-8' fontSize='text-l' styleCustom='m-4'><h1 >Ativos</h1></Button>
				<Button onClick={doLoanRequest('late')} height='h-8' fontSize='text-l' styleCustom='m-4'><h1 >Em atraso</h1></Button>
				<Button onClick={doLoanRequest('returned')} height='h-8' fontSize='text-l' styleCustom='m-4'><h1 >Devolvidos</h1></Button>
			</div>

			<div className="flex justify-center">
				<h1 className="text-2xl">{`Exibindo ${requestType}`}</h1>
			</div>

			<div id='table'>
				{
					loans.length &&
					loans.map((elem, index) =>

					(
						<div className='card' key={index}>
							<div className='card-left'>
								<span className='person-name'>
									<BsPerson size={18} />
									Nome: {elem.user.name || elem.userId}
								</span>
								<span className='book-name'>
									<AiOutlineBook size={18} />
									<Link to={`/livros/info/${elem.bookId}`}>Livro: {elem.book.title || elem.bookId} </Link>
								</span>
								{elem.approvedByUserName && (
									<span className=''>
										Aprovado por: {elem.approvedByUserName}
									</span>
								)}

								<span className='date'>
									<BsCalendarDate size={18} style={{ marginRight: 3 }} />
									Termina Dia: { moment(elem.loanEnd).format('DD/MM/YYYY') }
								</span>

							</div>

						</div>
					))
				}

			</div>

		</Container>

	);
};

export default Requests